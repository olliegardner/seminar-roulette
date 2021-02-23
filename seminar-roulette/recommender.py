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
    Recommender system code adapted from online tutorial.
    Partial credit goes to Nick Becker.
    https://beckernick.github.io/matrix-factorization-recommender/
    """
    def __init__(self, user):
        ratings_list = []

        # For each user in database
        for university_user in UniversityUser.objects.all().order_by('guid'):
            # For each seminar in database
            for seminar in Seminar.objects.all().order_by('title'):
                try:
                    # Check if user has a seminar history model create for that seminar
                    seminar_history = SeminarHistory.objects.get(
                        user=university_user, seminar=seminar
                    )

                    # Check if user has rated that seminar
                    if seminar_history.discarded:
                        rating = math.nan
                    else:
                        rating = int(seminar_history.rating)
                except SeminarHistory.DoesNotExist:
                    rating = math.nan

                # Append user, seminar and rating to a list
                ratings_list.append((university_user.guid, seminar.id, rating))

        # Create data frame for ratings list
        ratings_df = pd.DataFrame(
            ratings_list, columns=['guid', 'seminar', 'rating']
        )

        # Fill seminars which user hasn't rated with 0's
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
        # Normalise by each user's mean
        ratings_demeaned = ratings - ratings_mean.reshape(-1, 1)

        return guids, seminars, ratings_mean, ratings_demeaned

    def recommend(self, guids, seminars, ratings_mean, ratings_demeaned, guid):
        # Calculate singular value decomposition
        U, sigma, Vt = svds(ratings_demeaned, k=5)
        # Convert to diagonal matrix form
        sigma = np.diag(sigma)

        # Make predictions
        predicted_ratings = np.dot(np.dot(U, sigma),
                                   Vt) + ratings_mean.reshape(-1, 1)

        predictions_df = pd.DataFrame(
            predicted_ratings, index=guids, columns=seminars
        )

        # Manipulate data frame and sort by GUID
        df_sorted = predictions_df.loc[[
            guid
        ]].transpose().sort_values(by=guid, ascending=False)

        return df_sorted.index.values


def recommendation_engine(user):
    recommendation_seminars = []
    recommendations = Recommender(user).recommendations

    # Loop through the user's recommendations
    for recommendation in recommendations:
        # Get upcoming seminar if it is recurring
        upcoming_seminar = Seminar.objects.filter(
            id=recommendation
        ).order_by('start_time').first()

        recommendation_seminars.append(upcoming_seminar)

    # Get seminars which user has attended OR discarded
    seminar_history = user.seminarhistory_set.filter(
        Q(attended=True) | Q(discarded=True)
    )

    seminars_attended_discarded = Seminar.objects.filter(id__in=seminar_history)

    seminars = []
    count, seminar_count = 0, 0

    # Get 5 seminar recommendations
    while count < 5 and seminar_count < len(recommendation_seminars):
        seminar = recommendation_seminars[seminar_count]

        # Check user hasn't previously attended the seminar and that it is in the future
        if seminar not in seminars_attended_discarded and seminar is not None and seminar.is_future:
            seminars.append(recommendation_seminars[seminar_count])
            count += 1
        seminar_count += 1

    return seminars
