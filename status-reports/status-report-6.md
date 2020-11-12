# Status Report 6

This week, I revisited my recommender system and implemented it using live data from the database. I have created a Django management command which will be able to be executed within a cronjob to generate the matrix needed for the recommender system. Last week, Jeremy and I discussed changing the system so that it recommends the seminar group instead of the title. After conducting some more research, I had originally misunderstood how matrix factorisation via singular value decomposition works. It turns out, that the matrix will predict future ratings which is ideal for Seminar Roulette.

After implementing the recommender system with live data, I turned my head to the _I'm Feeling Hungry_ button. Using the nltk package, as Jeremy suggested, I was able to use the wordnet module to find words relating to food. Using these words, I was then able to query the database to find seminars containing these keywords and therefore the ones which serve food.

I have continued developing the frontend to try and make it as user friendly as possible. I am still experimenting with the frontend however. I have implemented some minor things on the frontend such as loading spinners and a 404 page - both of which improve the user experience.
