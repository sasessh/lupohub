from django.apps import AppConfig

class HubApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hub'

    def ready(self):
        import hub.signals
