import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seminar-roulette.settings')

import django
django.setup()

from backend.models import *
import csv
import os
import random
import pandas as pd
import numpy as np
import math

from django.utils import timezone
from scipy.sparse.linalg import svds


class Recommender:
    """
    Recommender system code implemented using a tutorial - https://beckernick.github.io/matrix-factorization-recommender/
    Credit goes to Nick Becker
    """
    def __init__(self, user):
        ratings_list = []

        for university_user in UniversityUser.objects.all().order_by('guid'):
            for seminar in Seminar.objects.all().order_by('title'):
                try:
                    seminar_history = SeminarHistory.objects.get(
                        user=university_user, seminar=seminar
                    )

                    if seminar_history.discarded:
                        rating = math.nan
                    else:
                        rating = int(seminar_history.rating)
                except SeminarHistory.DoesNotExist:
                    rating = math.nan

                ratings_list.append((university_user.guid, seminar.id, rating))

        ratings_df = pd.DataFrame(
            ratings_list, columns=['guid', 'seminar', 'rating']
        )

        combined_df = ratings_df.pivot(
            index='guid', columns='seminar', values='rating'
        ).fillna(0)

        guids, seminars, ratings_mean, ratings_demeaned = self.get_data(
            combined_df
        )

        self.recommendations = self.recommend(
            guids, seminars, ratings_mean, ratings_demeaned, user.guid
        )

    def get_data(self, ratings):
        guids = ratings.index.tolist()
        seminars = ratings.columns.tolist()
        ratings = ratings.values

        ratings_mean = np.mean(ratings, axis=1)
        ratings_demeaned = ratings - ratings_mean.reshape(-1, 1)

        return guids, seminars, ratings_mean, ratings_demeaned

    def recommend(self, guids, seminars, ratings_mean, ratings_demeaned, guid):
        U, sigma, Vt = svds(ratings_demeaned, k=5)
        sigma = np.diag(sigma)

        predicted_ratings = np.dot(np.dot(U, sigma),
                                   Vt) + ratings_mean.reshape(-1, 1)

        predictions_df = pd.DataFrame(
            predicted_ratings, index=guids, columns=seminars
        )

        df_sorted = predictions_df.loc[[
            guid
        ]].transpose().sort_values(by=guid, ascending=False)

        return df_sorted.index.values


def recommendation_engine(user):
    recommendation_seminars = []
    recommendations = Recommender(user).recommendations

    for recommendation in recommendations:
        # get upcoming seminar if it is recurring
        upcoming_seminar = Seminar.objects.filter(
            id=recommendation
        ).order_by('start_time').first()

        recommendation_seminars.append(upcoming_seminar)

    # get seminars which user has attended OR discarded
    seminar_history = user.seminarhistory_set.filter(
        Q(attended=True) | Q(discarded=True)
    )

    seminars_attended_discarded = Seminar.objects.filter(id__in=seminar_history)

    seminars = []
    count, seminar_count = 0, 0

    while count < 3 and seminar_count < len(recommendation_seminars):
        seminar = recommendation_seminars[seminar_count]

        if seminar not in seminars_attended_discarded and seminar is not None and seminar.is_future:
            seminars.append(recommendation_seminars[seminar_count])
            count += 1
        seminar_count += 1

    return seminars
