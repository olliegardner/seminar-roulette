from django.core.management.base import BaseCommand
from backend.models import CronJob

import event_feed


class Command(BaseCommand):
    help = "Functions to be performed by nightly cronjob"

    def handle(self, *args, **kwargs):
        try:
            event_feed.EventFeeds()  # Pulls data in from various event feeds
        except Exception as e:
            # If an error occurs, create a log of it
            CronJob.objects.create(error_message=str(e))
            self.stdout.write(e)
        else:
            # Log cronjob as a success
            CronJob.objects.create(success=True)
