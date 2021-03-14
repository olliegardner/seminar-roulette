# Status Report 9 - 10 Dec 2020

Last week, I didn’t make much progress on my project due to coursework deadlines and upcoming exams. The main changes I made were on the frontend. This involved making the application just a single page. I have implemented a search bar on the application which allows users to search for seminars which they might be interested in.

This week, most of my work involved configuring Shibboleth to work with my Django application. Fortunately, this is now all setup and working correctly. University of Glasgow students and staff members are now able to login into the system using their campus GUID and password. I would like to allow users to be able to use the system anonymously but with restricted features.

Following configuring Shibboleth, I setup a nightly cronjob on the VM which will pull in data from the various data sources. This will enable the data to be as up to date as possible.

Finally, I now feel that the application is ready for an initial evaluation. I would like to conduct this early next week with a small set of end users. Following their feedback, I would like to implement their suggestions at the end of next week.
