from django.core.management.base import BaseCommand
from main.models import TempCard
from django.utils import timezone
import datetime

class Command(BaseCommand):
    help = "Clears TempCards in the database that are more than one day old"

    def handle(self, *args, **options):
        one_day_ago = timezone.now() - datetime.timedelta(days=1)
        old_cards = TempCard.objects.filter(created__lt=one_day_ago)

        for card in range(len(old_cards)):
            old_cards[card].delete()

        self.stdout.write(
            self.style.SUCCESS("Successfully cleared TempCards more than one day old"),
        )