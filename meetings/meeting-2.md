# Meeting 2 - 9 Oct 2020

Jeremy thinks that this project has huge potential to be used by people all around the University. It will bring a fun aspect to discovering new seminars which are happening around the University.

Samoa is currently used mostly by the School of Computing Science. The Samoa developers really want other departments to use it too but they don't as much. Samoa should be used as a data stream throughout this project but we should not be creating new seminars on it through Seminar Roulette.

Jeremy highlighted some other potential data streams in the meeting. I should look into these for next week and also find some more sources of my own:

- EventBrite - mostly used for training sessions and events by the University but not really for seminars
- Emails - some seminars are only advertised through emails
- Other academic institutions e.g. Strathclyde University
- Roryal Statistical Society
- British Computer Society 
- meetup.com (https://www.meetup.com/find/gb--glasgow)

If a seminar is held on Zoom, there could potentially be a feature where the Zoom link is automatically opened when a Seminar has been picked for the user.

We discussed how we would add an element of serendipity to the application in order to broaden people's minds. Jeremy suggested that we could add a _I'm feeling lucky_ button - I like this idea.

We outlined the major challenges for the project:

- How can we ensure that we have reliable and wide event streams?
- Working out what users of the system actually want from it (designing requirements)
- How do people find seminars to go to at the moment (check emails, put in calendar if interested)
- If logged in with Shibboleth, can we access exchange calendar?

Why did I choose Django? Open source, prior experience, Python is a mainstream programming language. Jeremy suggested that I outline this in my dissertation now before I forget.

For data sources, we need an intermeidate layer e.g. local cache with Redis. Jeremy suggested having 2 databases - 1 for the cache of seminars and the other acting as a persistent store of seminars that a user has been to.

Jeremy would like to have a feature where he can select the time at which the seminar is happening before searching e.g. now, today, this week, etc.

Plan for next week:

- Setup VM
- Look for alternative event streams
- Capturing requirements (functional requirements)
- Schematic diagram, architecture of the system
- User survey of staff (what would staff members like to see in the system)