# Meeting 8 - 20 Nov 2020

The meeting started with me giving Jeremy a demo of the progress I had made this week. On the seminar history, page he had an idea where if a user clicks on the stars to rate them, this should automatically set the seminar as attended in the database. This will reduce the number of clicks the user has to perform on this page. To dismiss the seminar, there could be a cross in the top right hand corner.

Jeremy thought it would be nice to have a feature where the seminar is categorised. This could be done using some simple keyword matching. This would allow people to filter out seminars which they aren't interested in easily. Jeremy recommended adding this to my non-functional requirements.

I explained to Jeremy that I didn't have a chance to look at connecing to a user's calendar. He said this was fine and should be something which I look into next week.

Finally, we discussed getting the system deployed to the howard.dcs VM. I explained to Jeremy that I was struggling setting up a self-signed certificate. He informed me that a self-signed certificate will always show up as insecure in your browser as the browser won't be able to verify it. I will email John to see if Shibboleth can be set up with a self-signed certificate.
