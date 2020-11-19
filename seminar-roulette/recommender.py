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

from django.utils import timezone
from scipy.sparse.linalg import svds


class Recommender:
    """
    Recommender system code implemented using a tutorial - https://beckernick.github.io/matrix-factorization-recommender/
    Credit goes to Nick Becker
    """
    def __init__(self, user):
        #self.create_fake_ratings()
        #fake_matrix = pd.read_csv('fake_ratings.csv', index_col=0)

        matrix = pd.read_csv('ratings.csv', index_col=0)
        guids, seminars, ratings_mean, ratings_demeaned = self.get_data(matrix)

        self.recommendations = self.recommend(
            guids, seminars, ratings_mean, ratings_demeaned, user.guid
        )

    def create_fake_ratings(self):
        print('Creating fake ratings csv. Please wait...')

        with open('fake_ratings.csv', 'w', newline='') as ratings_file:
            seminars = [seminar.title for seminar in Seminar.objects.all()]
            seminars = list(
                dict.fromkeys(seminars)
            )  # removes duplicate seminar titles
            seminars.insert(0, 'users')

            writer = csv.writer(ratings_file)
            writer.writerow(seminars)

            for i in range(1, 101):
                guid = 'user' + str(i)

                user, user_created = UniversityUser.objects.get_or_create(
                    guid=guid, name=guid
                )

                ratings = [user.guid]

                for seminar in seminars[1:]:
                    random_number = random.randint(1, 100)

                    if random_number <= 75:
                        ratings.append(None)  # set rating to none
                    else:
                        rating_options = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
                        ratings.append(
                            random.choice(rating_options)
                        )  # set rating 1-5

                writer.writerow(ratings)

        print('Fake ratings csv created!')

    def get_data(self, ratings):
        ratings.fillna(0, inplace=True)  # fill empty values

        guids = ratings.index.tolist()
        seminars = ratings.columns.tolist()
        ratings = ratings.values

        ratings_mean = np.mean(ratings, axis=1)
        ratings_demeaned = ratings - ratings_mean.reshape(-1, 1)

        return guids, seminars, ratings_mean, ratings_demeaned

    def recommend(self, guids, seminars, ratings_mean, ratings_demeaned, guid):
        U, sigma, Vt = svds(ratings_demeaned, k=5)
        sigma = np.diag(sigma)

        ratings_predicted = np.dot(np.dot(U, sigma),
                                   Vt) + ratings_mean.reshape(-1, 1)

        predictions_df = pd.DataFrame(
            ratings_predicted, index=guids, columns=seminars
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
            title=recommendation
        ).order_by('start_time').first()
        recommendation_seminars.append(upcoming_seminar)

    # get seminars which user has attended OR discarded
    seminar_history = user.seminarhistory_set.filter(
        Q(attended=True) | Q(discarded=True)
    )
    seminars_attended_discarded = Seminar.objects.filter(id__in=seminar_history)

    seminars = []
    count, seminar_count = 0, 0

    while count < 6 and seminar_count < len(recommendation_seminars):
        seminar = recommendation_seminars[seminar_count]

        if seminar not in seminars_attended_discarded and seminar is not None and seminar.is_future(
        ):
            seminars.append(recommendation_seminars[seminar_count])
            count += 1
        seminar_count += 1

    return seminars
