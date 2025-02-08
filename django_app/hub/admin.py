from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'employee_number', 'is_staff', 'is_ldap_user']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('employee_number', 'is_ldap_user',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)