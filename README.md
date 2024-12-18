# Projekt LupoHub

## Instalacja

### Krok 1: Instalacja zależności APT
Uruchom skrypt `setup.sh`, aby zainstalować wszystkie wymagane pakiety APT:
```sh
chmod +x setup.sh
./setup.sh
```

### Krok 2: Instalacja zależności Python
```sh
pip install -r requirements.txt
```

### Krok 3: local_settings.py

### Krok 4: Django
```sh
python manage.py migrate
python manage.py createsuperuser
python manage.py create_default_groups
```