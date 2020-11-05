import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'seminar-roulette.settings')

import django
django.setup()

from backend.models import *
import csv
import random
import os
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds


class Recommender:
    def __init__(self, user):
        #self.create_fake_ratings()

        ratings = pd.read_csv(os.getcwd() + '/fake_ratings.csv', index_col=0)

        self.clean_fake_data(ratings)

        users, seminars, ratings_mean, ratings_demeaned = self.clean_fake_data(
            ratings
        )

        self.recommendations = self.recommend(
            users, seminars, ratings_mean, ratings_demeaned, user.guid
        )

    def create_fake_ratings(self):
        print('Creating fake ratings csv. Please wait...')

        with open('fake_ratings.csv', 'w', newline='') as ratings_file:
            seminars = [seminar.title for seminar in Seminar.objects.all()]
            seminars = list(dict.fromkeys(seminars))  # removes duplicates
            seminars.insert(0, 'users')

            writer = csv.writer(ratings_file)
            writer.writerow(seminars)

            for i in range(1, 101):
                guid = 'user' + str(i)

                user, user_created = UniversityUser.objects.get_or_create(
                    guid=guid, name=guid
                )

                print(user)

                ratings = [user.guid]

                for seminar in seminars[1:]:
                    random_number = random.randint(1, 100)

                    if random_number <= 75:
                        # set rating to none
                        ratings.append(None)
                    else:
                        # set rating 1-5
                        rating_options = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
                        ratings.append(random.choice(rating_options))

                writer.writerow(ratings)

        print('Fake ratings csv created!')

    def clean_fake_data(self, ratings):
        ratings.fillna(0, inplace=True)  # fill empty values

        users = ratings.index.tolist()
        seminars = ratings.columns.tolist()
        ratings = ratings.values

        ratings_mean = np.mean(ratings, axis=1)
        ratings_demeaned = ratings - ratings_mean.reshape(-1, 1)

        return users, seminars, ratings_mean, ratings_demeaned

    def recommend(self, users, seminars, ratings_mean, ratings_demeaned, guid):
        U, sigma, Vt = svds(ratings_demeaned, k=5)
        sigma = np.diag(sigma)

        ratings_predicted = np.dot(np.dot(U, sigma),
                                   Vt) + ratings_mean.reshape(-1, 1)

        predictions_df = pd.DataFrame(
            ratings_predicted, index=users, columns=seminars
        )

        df_sorted = predictions_df.loc[[
            guid
        ]].transpose().sort_values(by=guid, ascending=False)

        return df_sorted.index.values


def recommendation_engine(user):
    #user = request.user
    recommendations = Recommender(user).recommendations

    #print(recommendations)

    #return recommendations

    seminar_objects = []

    for reccomendation in recommendations:
        for seminar in Seminar.objects.filter(title__icontains=reccomendation):
            seminar_objects.append(seminar)

    seminar_list = []
    i = 0
    seminar_count = 0

    seminar_history = SeminarHistory.objects.filter(user=user)

    # get seminars which user has attended OR discarded
    seminar_history_attended_discarded = seminar_history.filter(
        Q(attended=True) | Q(discarded=True)
    ).values_list('seminar')

    seminars_attended_discarded = Seminar.objects.filter(
        id__in=seminar_history_attended_discarded
    )

    #print(user.seminarhistory_set.all())

    while i < 5 and seminar_count < len(seminar_objects):
        if seminar_objects[seminar_count] not in seminars_attended_discarded:
            seminar_list.append(seminar_objects[seminar_count])
            i += 1
        seminar_count += 1

    return seminar_list


# if __name__ == '__main__':
#     Recommender()