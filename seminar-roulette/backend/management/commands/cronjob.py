from django.core.management.base import BaseCommand
from django.core.management import call_command
from backend.models import CronJob

import event_feed


class Command(BaseCommand):
    help = "Functions to be performed by nightly cronjob"

    def handle(self, *args, **kwargs):
        try:
            event_feed.EventFeeds()
            call_command("ratings")
        except Exception as e:
            CronJob.objects.create(error_message=str(e))
            self.stdout.write(e)
        else:
            CronJob.objects.create(success=True)
