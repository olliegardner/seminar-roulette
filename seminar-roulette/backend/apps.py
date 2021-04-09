from django.apps import AppConfig
from watson import search as watson


class BackendConfig(AppConfig):
    name = 'backend'

    def ready(self):
        # Register models to use within Django watson search
        seminar_model = self.get_model('Seminar')
        watson.register(seminar_model)

        seminar_group_model = self.get_model('SeminarGroup')
        watson.register(seminar_group_model)

        location_model = self.get_model('Location')
        watson.register(location_model)

        speaker_model = self.get_model('Speaker')
        watson.register(speaker_model)
