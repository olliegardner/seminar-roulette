# Timelog

- Seminar Roulette
- Ollie Gardner
- 2410049g
- Jeremy Singer

## Week 1

- N/A - projects not released.

## Week 2

### 30 Sep 2020

- _0.5 hour_ Created GitHub repository and added the given master template with some minor adjustments.

### 1 Oct 2020

- _1.5 hour_ Researched different reference managers. Downloaded Zotero and watched a tutorial on how to use it.

### 2 Oct 2020

- _0.5 hour_ Initial meeting with supervisor (Jeremy Singer).
- _0.5 hour_ Logged meeting minutes from initial meeting with Jeremy.

### 4 Oct 2020

- _1.5 hour_ Did some research into potential data sources. Mainly focused on https://samoa.dcs.gla.ac.uk/events/ and EventBrite.

## Week 3

### 5 Oct 2020

- _0.5 hour_ Emailed the developers of the Samoa seminar system to ask how to access their API. Currently, the API returns a page not found error.
- _1.5 hour_ Researched different technologies to use for the web application. Leaning towards using Django for the backend and React for the frontend. This is mostly because I have experience in using both of these technologies.

### 7 Oct 2020

- _0.5 hour_ Emailed SoCS support to request access to a Linux VM on the OpenStack cluster.
- _0.5 hour_ Wrote up status report for week 2 in preparation for 2nd meeting with Jeremy.

### 8 Oct 2020

- _0.5 hour_ Wrote up user stories and added them to the wiki.
- _1.5 hour_ Created some basic wireframes for the project - still need to be refined further.

### 9 Oct 2020

- _1 hour_ 2nd meeting with Jeremy and wrote up the minutes.

### 10 Oct 2020

- _1 hour_ Uploaded dissertation template and setup GitHub action for compiling dissertation on push and pull requests.

### 11 Oct 2020

- _2 hour_ Setup chosen technologies - Django and React. Started building basic RESTful API to check that client and server can interact with eachother.
- _0.5 hour_ Created Trello board for ticket/issue management.

## Week 4

### 13 Oct 2020

- _1 hour_ Wrote up functional and non-functional requirements.
- _1.5 hour_ Developed user survey for staff members to build upon my requirements.

### 14 Oct 2020

- _1.5 hour_ Drew up version 1 of database schema and added it to the wiki.

### 15 Oct 2020

- _0.5 hour_ Contacted John Watt about setting up Shibboleth on my VM.
- _1.5 hour_ Researched more into potential data sources and created a wiki page outlining the various sources that I found.
- _0.5 hour_ Sent my weekly status report to Jeremy.
- _1 hour_ Re-visited my user stories and updated them to fit my requirements.
- _0.5 hour_ Drew up version 1 of system architecture diagram.

### 16 Oct 2020

- _1.5 hour_ Revisited wireframes and created new ones to better reflect my list of functional requirements.
- _1 hour_ Weekly meeting with Jeremy and wrote up the meeting minutes from it.

### 18 Oct 2020

- _2 hour_ Setup Apache web server and installed Shibboleth onto the howard.dcs VM.
- _1.5 hour_ Setup custom university user model and tried to get this to work with JWT authentication.

## Week 5

### 20 Oct 2020

- _2 hour_ Completely restructured project so that now Django and React aren't separate applications. This was done as Shibboleth can't interact with JWT as I expected.

### 21 Oct 2020

- _4 hour_ Continued with the setup of the VM which was causing me a lot of problems. Just need to get PostgreSQL setup on the VM now.

### 22 Oct 2020

- _4 hour_ Setup feed from Samoa events and implemented a random seminar button which displays a random seminar from Samoa on the frontend.
- _1 hour_ Researched different CSS frameworks for React. I am going to use Material-UI from Google.

### 23 Oct 2020

- _1 hour_ Attempted to setup SLL self-signed certificate.
- _1 hour_ Weekly meeting with Jeremy and wrote up meeting minutes.

## Week 6

### 26 Oct 2020

- _2 hour_ Created GitHub CI pipeline for Django unit tests. Wrote some basic unit tests for the Samoa feed.
- _2 hour_ Started working on the frontend of Seminar Roulette. Added a roulette wheel animation.

### 29 Oct 2020

- _2 hour_ Continued on the frontend of the project. Added an animation so that the chosen seminar flys on to the page.
- _3 hour_ Implemented user seminar history which is added to whenever a seminar is recommended to a user. Users have the ability to say whether they have attended the seminar or not and what they would rate it if they did attend.

### 30 Oct 2020

- _1 hour_ Weekly meeting with Jeremy and wrote up the meeting minutes.

## Week 7

### 2 Nov 2020

- _1.5 hour_ Re-designed the frontend of the system, making theme colour indigo.

### 3 Nov 2020

- _1.5 hour_ Started working on the navigation structure of the system. Created a top navigation bar.

### 4 Nov 2020

- _1.5 hour_ Finished off navigation flow and made the topbar responsive on mobile. Change rating to stars from 1-5.
- _3 hour_ Added the ability to filter by time. Improved upon the frontend some more too.

### 5 Nov 2020

- _1 hour_ Conducted research into different types of recommender systems.
- _3 hour_ Implemented a recommender system using fake ratings data.

### 6 Nov 2020

- _1 hour_ Weekly meeting with Jeremy and wrote up meeting minutes.

## Week 8

### 10 Nov 2020

- _4 hour_ Continued working on the implementation of the recommender system. This now uses live data instead of a fake ratings matrix.

### 12 Nov 2020

- _2 hour_ Conducted research into natural language processing and specifically the nltk Python package.
- _2 hour_ Implemented I'm Feeling Hungry feature.

### 13 Nov 2020

- _2 hour_ Continued improving the frontend of the system.
- _1 hour_ Weekly meeting with Jeremy and wrote up the meeting minutes.
- _1 hour_ More frontend improvements.

## Week 9

### 18 Nov 2020

- _2.5 hour_ Wrote a script which scrapes events/seminars on EventBrite and adds them to the database.
- _2 hour_ Continued hacking away at the VM, trying to get it deployed for wider use.

### 19 Nov 2020

- _1 hour_ Continued working on getting the system deployed to the VM
- _2 hour_ Created a dashboard and improved the look and feel of the system.

### 20 Nov 2020

- _1 hour_ Weekly meeting with Jeremy and wrote up the meeting minutes.

### 25 Nov 2020

- _2 hour_ Finally deployed system to the howard.dcs VM :)

### 26 Nov 2020

- _1.5 hour_ Continued setting up Shibboleth on the VM.

### 27 Nov 2020

- _1 hour_ Weekly meeting with Jeremy and wrote up meeting minutes.

## Week 10

### 3 Dec 2020

- _0.5 hour_ Added clear button to the seminar cards on the history page.

### 5 Dec 2020

- _1 hour_ Updated PostgreSQL version on the VM so that it was compatible with Django.

### 6 Dec 2020

- _2 hour_ Finally finished configuring Shibboleth - headers are now returned to the Django application and users can log in with thier university credentials.

## Week 11

### 7 Dec 2020

- _4 hour_ Continued improving the frontend of the application. Started implementation of the search bar.

### 8 Dec 2020

- _4 hour_ Attended dissertation guidance lectures.
- _2 hour_ Finished implementation of the search bar - allows users to search for seminars.

### 11 Dec 2020

- _2 hour_ Implemented nightly cronjob to automatically pull data in from Samoa and EventBrite.
- _1 hour_ Weekly meeting with Jeremy and wrote up meeting minutes.

## Week 12

### 14 Dec 2020

- _0.5 hour_ Completed SoCS ethics form and got Jeremy to sign it.
- _4 hour_ Added filters to past seminars which allows a user to show/hide previously rated or discarded seminars.

### 15 Dec 2020

- _1 hour_ Created a model to track the success of the nightly cronjobs.
- _3 hour_ Created wordcloud which represents keywords within a seminar's description.

### 16 Dec 2020

- _2 hour_ Conducted think aloud evaluations with 2 participants.
- _0.5 hour_ Fixed issue where new Python packages were not being installed correctly on the VM.
- _0.5 hour_ Fixed permissions error on VM which was preventing nltk from downloading correctly.
- _0.5 hour_ Seminar descriptions now render html tags on the frontend if they are found in the text.
- _0.5 hour_ Changed logout URLs to use relative paths instead of absolute.

### 17 Dec 2020

- _4 hour_ Conducted more think aloud evaluations with different participants to last time.
- _2 hour_ Started write up of semester 1 status report.

### 18 Dec 2020

- _1 hour_ Finished off semester 1 status report, submitted it on Moodle and emailed it to supervisor.

## Winter Break

### 28 Dec 2020

- _2 hour_ Changed recommender system so that it no longer uses a csv file to store the seminar ratings.
- _1 hour_ Started consolidating data from the initial user survey in /data.

### 30 Dec 2020

- _1.5 hour_ Started typing up think aloud evaluation responses.

### 31 Dec 2020

- _1 hour_ Continued typing up think aloud evaluation responses.

### 1 Jan 2021

- _0.5 hour_ Finished typing up think aloud evaluation responses.
- _0.5 hour_ Wrote up README for the data folder which explains what data is stored and how it was captured.

### 5 Jan 2021

- _0.5 hour_ Added the top 3 seminar keywords to the seminar card.
- _1.5 hour_ Started changing the layout of the seminars from a grid to a list.

### 6 Jan 2021

- _3 hour_ Finished off changing the grid view to a list view and added more seminar details to the card such as seminar group and registration URL.
- _1.5 hour_ Implemented pagination throughout the application.
- _1.5 hour_ Disabled certain features when the user is not authenticated so that the application can be used anonymously.

### 7 Jan 2021

- _2 hour_ Created an add to calendar button which allows a user to download an icalendar ics file.

## Week 13

### 11 Jan 2021

- _5.5 hour_ Implemented a seminar recommendation algorithm based on a user's personal interests. The algorithm uses WuPalmer similarity to match a user's interests with keywords within the seminar's description.

### 12 Jan 2021

- _1.5 hour_ Started planning and writing chapter 1 of the dissertation on Overleaf.

### 13 Jan 2021

- _2 hour_ Continued the writing of chapter of the dissertation. Also started planning chapter 2 and 3.

### 14 Jan 2021

### 15 Jan 2021

- _1 hour_ Weekly meeting with supervisor and wrote up meeting minutes.
