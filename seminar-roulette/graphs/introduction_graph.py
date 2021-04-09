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

import datetime
import matplotlib.pyplot as plt
import statistics

import numpy as np


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

    average_seminars = np.mean(number_seminars)
    standard_deviation = np.std(number_seminars)
    total_seminars = np.sum(number_seminars)

    print()
    print('Total number of seminars: ' + str(total_seminars))
    print('Average per week: ' + str(average_seminars))
    print('Standard deviation: ' + str(standard_deviation))
    print()

    intro_graph = plt.figure()

    plt.bar(weeks, number_seminars)
    plt.title('Seminars in semester two of session 2020/2021')
    plt.xlabel('Week')
    plt.ylabel('No. of Seminars')
    plt.xticks(weeks)
    plt.yticks(range(0, 24, 4))
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