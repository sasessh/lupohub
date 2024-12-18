import ldap
from django_auth_ldap.config import LDAPSearch

# LDAP
# Ustawienia serwera LDAP
AUTH_LDAP_SERVER_URI = "ldap://your_ldap_server_address"

# Połączenie i uwierzytelnianie
AUTH_LDAP_BIND_DN = "cn=your_bind_dn,dc=example,dc=com"
AUTH_LDAP_BIND_PASSWORD = "your_bind_password"

# Wyszukiwanie użytkowników
AUTH_LDAP_USER_SEARCH = LDAPSearch("ou=People,dc=example,dc=com", ldap.SCOPE_SUBTREE, "(uid=%(user)s)")

# Mapowanie atrybutów LDAP do modelu użytkownika Django
AUTH_LDAP_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail"
}

# Automatyczne tworzenie użytkowników w Django
AUTH_LDAP_ALWAYS_UPDATE_USER = True

# Logowanie LDAP
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('django_auth_ldap')
logger.addHandler(logging.StreamHandler())

