from django.core.management.base import BaseCommand
from django.conf import settings
from backend.models import *

import pandas as pd
import numpy as np


class Command(BaseCommand):
    help = 'Update ratings matrix for recommender engine'

    def handle(self, *args, **kwargs):
        print('Updating ratings matrix. Please wait...')

        matrix = pd.read_csv('ratings.csv', index_col=0)

        for seminar in Seminar.objects.all():
            title = seminar.title
            if title not in matrix.columns.values:
                matrix[title] = np.nan  # adds new seminars to the matrix

        for user in UniversityUser.objects.all():
            guid = user.guid

            if guid in matrix.index.values:
                matrix = matrix.drop(index=guid)

            matrix = matrix.reindex(matrix.index.values.tolist() + [guid])
            ratings = []

            # add current user ratings to matrix
            for seminar in matrix.columns.values:
                for seminar_history in user.seminarhistory_set.all():
                    if seminar_history.seminar.title == seminar:
                        matrix.at[guid, seminar] = seminar_history.rating

        matrix.to_csv('ratings.csv')  # update matrix

        print('Ratings matrix csv updated.')
