# Status Report 5

I began this week by significantly improving upon the frontend of the system. Jeremy suggested last week that the user interface should be minimal and I should use Google as inspiration. In order to improve the frontend, I implemented a navigation bar at the top which will allow the user to navigate through the different pages. On the seminar history page, I have changed the ratings to stars from 1 to 5. Users are also able to select 0.5 values too. This is much more user friendly than having a dropdown for rating.

On the home page, I have added a dropdown which allows users to find seminars by time. The current options are: in an hour, today, tomorrow, this week and this month. This allows the user to find seminars when they would like to. I have also ensured that seminars aren't suggested to users which they have attended before.

Towards the end of the week, I conducted some research into various recommender systems. Jeremy suggested that I look into collaborative filtering. I have discovered that collaborative filtering does not scale well with large datasets. Instead, I have implemented a recommender system using matrix factorisation via singular value decomposition. This technique has been used by Netflix (https://datajobs.com/data-science-repo/Recommender-Systems-[Netflix].pdf) and I think it will be extremely reliable within Seminar Roulette. It was important to me to implement the recommender system myself and not just use a plugin which is another reason why I chose this technique.

I have started thinking about the _I'm Feeling Hungry_ button and how I could use keyword matching to detect seminars which provide food. I would like to implement this feature next week but will see what Jeremy thinks about this first.