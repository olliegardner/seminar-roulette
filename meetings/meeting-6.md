# Meeting 6 - 6 Nov 2020

The meeting began with me giving Jeremy a demonstration of the system and showing the progress that I had made this week. Jeremy liked the progress that I had made with the recommender system. However, he outlined a small issue with it. Since the recommender system looks at the title of the seminar, it would be pointless to recommend seminars to users which have already happened. This is because the user will have no way of going to seminars in the past. Another issue is that the matrix might be very sparse with there being so many seminars and not many ratings. We discussed this problem at length and think that the solution is to look at the seminar group instead of the title. This will mean that users will have seminars recommended to them from the same group. Jeremy said that this will be a good section to have in the design chapter of my dissertation.

Following on from this, we discussed how testing could be used to evaluate how successful the recommender algorithm is. Jeremy suggested using A/B testing which will allow me to test out multiple algorithms on end users.

Finally, we discussed the implementation of the _I'm Feeling Hungry_ button. Jeremy suggested that I look at natural language processing (https://www.nltk.org/) to do this. This will enable me to find all of the seminars which serve food.
