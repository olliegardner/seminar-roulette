# Status Report 4

This week, I have been concentrating on the frontend of the project. I thought about a few different designs and animations which I could have. I decided to implement a roulette wheel on the main page which spins when you press a button. I think this is extremely slick and makes the system fun to use. I have implemented "fly in" animations for when the seminar is displayed to the user. I am not 100% sure on my colour scheme but I can work on it throughout the project.

I have setup some basic unit tests for the Samoa events feed. I have also setup continuous integration on GitHub so that whenever I create a pull request for the development or master branch, the unit tests are ran. The branch can then only be merged if these unit tests pass. I aim to setup more unit tests as I progress through the project and add more features to the backend.

I have started writing the code to keep track of which seminars users have been to. This currently works by keeping track of which seminars have been recommended to a user. The user then manually has to click to say if they have been to the seminar or not. If they have been to the seminar, then they are able to give it a rating from 1 to 10. I would like to use matrix decomposition to recommend seminars to users. This would work by looking at seminars which a user hasn't attended and then matching up their ratings with other users who have rated seminars in a similar fashion. I would like to know what Jeremy thinks of this idea but I think it would be a good way of recommending seminars to users which they might have thought about visiting before!

I haven't made anymore progress on the VM but I am hoping to do so over the weekend or next week at some point.
