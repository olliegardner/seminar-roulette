# Meeting 3 - 16 Oct 2020

I started the meeting by showing Jeremy my GitHub repository and the Trello board which I have setup for ticket management. I invited Jeremy to my repository and Trello board and he has now accepted these invitations. Jeremy likes how I have organised my GitHub wiki and he thinks this will benefit me when I start writing my dissertation.

After looking at my initial wireframes, we have discovered that _I'm Feeling Lucky_ has been trademarked by Google. We will have to find another name for this feature e.g. _I'm Feeling Serendipitous_. Jeremy didn't think that the interests page boded well for the end user. He suggested changing the interests page so that user's enter tags which they are interested in. From here, the application will use a best key word match for these interests and match them to tags on the seminar. I like his suggestion and will use this idea in Seminar Roulette.

Next, we discussed the potential event data sources which I had gathered. We brainstormed the best ways to retrieve data from all of these sources. We agreed that it would be good to have a nightly cronjob set up. This means that the Seminar Roulette database will be populated with data nightly from all the external sources. A point that Jeremy raised was that will Samoa throttle my requests in anyway. I will email the developer of Samoa, Andrew, to ask.

I explained to Jeremy that I would like to take an Agile approach to this project and start development as soon as possible. We agreed for next week that I should get the events feed from Samoa setup and do basic querying on it on my end.

Following on my from my initial user survey, I asked Jeremy if I would have to sign the ethics form. He said that this wasn't necessary as it was anonymous and informal requirements gathering. At some point in the project, I will need to do a user evaluation. This will require the ethics form being signed.

Jeremy suggested that I write unit tests as I go. I should automate these unit tests and build the system with this workflow in mind. By writing unit tests as I go, this will improve my evaluation section in my dissertation.
