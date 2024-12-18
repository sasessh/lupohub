import ldap

# Połączenie z serwerem LDAP
conn = ldap.initialize('ldap://192.168.1.238')
conn.simple_bind_s('cn=admin,dc=local', 'zaq12wsx')

# Wyszukiwanie użytkownika
result = conn.search_s('ou=People,dc=local', ldap.SCOPE_SUBTREE, '(uid=pkielkowski)')
print(result)
