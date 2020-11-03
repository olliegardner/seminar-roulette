# Timelog

- Seminar Roulette
- Ollie Gardner
- 2410049g
- Jeremy Singer

## Week 1

N/A - projects not released.

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
