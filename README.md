# Seminar Roulette

![Django Pipeline](https://github.com/olliegardner/seminar-roulette/actions/workflows/django.yml/badge.svg)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![GitHub contributors](https://img.shields.io/github/contributors/olliegardner/seminar-roulette.svg)](https://github.com/olliegardner/seminar-roulette/graphs/contributors/)

## Background

Academics at the University of Glasgow are typically time-poor and do not have time to trawl through lists of research seminars to find one that they haven't attended before and is of interest to them. The Unveristy of Glasgow currently presents various methods of discovering events taking place at the University.

Seminar Roulette is an event recommendation platform for the University of Glasgow academic community. It aims to become the University's central source for seminar management and organisation. The web application contains a recommender system that suggests seminars to users based on how they have rated past events. Furthermore, it pulls in data from various University seminar sources, such as, [Samoa Events](https://samoa.dcs.gla.ac.uk/events/) and [Eventbrite](https://www.eventbrite.co.uk/).

The system was developed by Ollie Gardner as his 4th year individual project for a BSc Software Engineering degree. The project was supvervised by [Dr Jeremy Singer](http://www.dcs.gla.ac.uk/~jsinger/).

## File Structure

This repository contains all of the submitted project files and also the application's source code. The project has been structured as follows.

    .
    ├── data                    # Data acquired during the project.
    ├── dissertation            # LaTeX source for dissertation.
    ├── meetings                # Records of supervisor meetings.
    ├── presentation            # Video presentation given at the end.
    ├── seminar-roulette        # Source code for the project.
    ├── status-reports          # Weekly reports sent to supervisor.
    ├── LICENSE                 # License for the project.
    ├── manual.md               # Guide for how to setup the codebase.
    ├── plan.md                 # Week-by-week plan for project.
    ├── README.md               # README file.
    └── timelog.md              # Time log for the whole project.

## Technologies

Seminar Roulette was developed using the following technologies:

- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [React.js](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Samoa Events API](https://samoa.dcs.gla.ac.uk/swagger-ui/)
- [Eventbrite API](https://www.eventbrite.com/platform/api)

Python requirements can be found in [requirements.txt](seminar-roulette/requirements.txt).

npm dependencies can be found in [package.json](seminar-roulette/frontend/package.json).

## Screenshots

_TODO_

## User Manual

A manual has been created to explain how to run and setup Seminar Roulette. See [manual.md](manual.md) file for more details.

## Acknowledgements

The code found in the [shibboleth folder](seminar-roulette/shibboleth/) is reponsiuble for connecting the University's single sign-on to Seminar Roulette. Full credit for the code contained in this folder goes to the authors of [django-shibboleth-remoteuser](https://github.com/Brown-University-Library/django-shibboleth-remoteuser). This project has been licensed under the MIT License.

The recommender system code found within [recommender.py](seminar-roulette/recommender.py) was partially implemented using a tutorial. Partial credit for this code goes to Nick Becker for his [Matrix Factorisation for Movie Recommendations in Python](https://beckernick.github.io/matrix-factorization-recommender/) tutorial.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for more details.

---

Ollie Gardner
