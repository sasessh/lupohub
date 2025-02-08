from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema
from .serializers import LoginSerializer


User = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=LoginSerializer,
        responses={
            200: {
                'type': 'object',
                'properties': {
                    'refresh': {'type': 'string'},
                    'access': {'type': 'string'},
                },
            },
            400: {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'},
                },
            },
        },
    )
            
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is None:
            try:
                user = User.objects.get(username=username)
                if not user.check_password(password):
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if hasattr(user, 'ldap_user') and user.ldap_user is not None:
                user.is_ldap_user = True
                user.save() #TODO nie działa ustawienie is_ldap_user na True

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Zwraca informacje o profilu zalogowanego użytkownika.",
        responses={
            200: {
                'type': 'object',
                'properties': {
                    'first_name': {'type': 'string'},
                    'last_name': {'type': 'string'},
                    'email': {'type': 'string'},
                    'employee_number': {'type': 'integer'},
                    'is_ldap_user': {
                        'type': 'boolean',
                        'description': 'Określa, czy użytkownik został uwierzytelniony przez LDAP.'
                    },
                },
            },
        },
    )
    def get(self, request):
        user = request.user
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'employee_number': user.employee_number,
            'is_ldap_user': user.is_ldap_user,
        })