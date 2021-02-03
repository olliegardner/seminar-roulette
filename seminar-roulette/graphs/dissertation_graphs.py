import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seminar-roulette.settings')

import django
django.setup()

from backend.models import *
from django.db.models.functions import ExtractDay, ExtractWeek
from django.db.models import Count

import matplotlib.pyplot as plt
import datetime


def introduction_graph():
    start_semester_2 = datetime.datetime(2021, 1, 11)
    end_semester_2 = datetime.datetime(2021, 3, 29)

    seminars = Seminar.objects.filter(
        start_time__gte=start_semester_2, end_time__lt=end_semester_2
    )

    seminars_by_week = seminars.annotate(
        week=ExtractWeek('start_time')
    ).values('week').annotate(number_seminars=Count('week'))

    seminars_by_week = sorted(seminars_by_week, key=lambda week: week['week'])

    weeks = [seminar['week'] - 1 for seminar in seminars_by_week]
    number_seminars = [
        seminar['number_seminars'] for seminar in seminars_by_week
    ]

    average_seminars = sum(number_seminars) / len(number_seminars)
    print('Average: ' + str(average_seminars))

    intro_graph = plt.figure()

    plt.bar(weeks, number_seminars)
    plt.title('Seminars taking place each week in semester 2 of session 20/21')
    plt.xlabel('Week')
    plt.ylabel('No. of Seminars')
    plt.xticks(weeks)
    plt.axhline(
        average_seminars,
        linewidth=1,
        color='red',
        ls='--',
        label='Average no. of seminars'
    )
    plt.legend()
    plt.show()

    intro_graph.savefig('semester_2_seminars.pdf', bbox_inches='tight')


if __name__ == '__main__':
    introduction_graph()