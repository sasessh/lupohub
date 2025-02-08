# Projekt Lupo Hub

## Instalacja

### Krok 1: Instalacja zależności APT
Uruchomić skrypt `setup.sh`, aby zainstalować wszystkie wymagane pakiety APT:
```sh
chmod +x setup.sh
./setup.sh
```

### Krok 2: Instalacja zależności Python
```sh
pip install -r requirements.txt
```

### Krok 3: local_settings.py
Zmienić **django_app\django_app\local_settings_example.py** na **local_settings.py** i wprowadzić poprawne dane.

### Krok 4: Django
```sh
python manage.py collectstatic
python manage.py migrate
python manage.py createsuperuser
python manage.py create_default_groups
```