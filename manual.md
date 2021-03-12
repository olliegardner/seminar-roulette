# User Manual

This guide serves as a manual, explaining how to install, run and test the Seminar Roulette web application. If you encouter any issues whilst installing, please contact the [developer](https://github.com/olliegardner).

## Contents

CONTENTS GO HERE

## 1. Git

To retrieve the project files, you must have Git installed. To install Git, follow these [installation instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Once Git has been installed, clone the repository using the following command:

```
git clone https://github.com/olliegardner/seminar-roulette.git
```

## 2. Backend

### 2.1 Python

Seminar Roulette requires Python 3.7 or later to be installed on your machine to run. [Download Python](https://www.python.org/downloads/) and follow the installation instructions for your operating system. Check you have the correct version of Python installed by running `python --version` in your command line.

### 2.2 Django and other Requirements

Navigate to the folder `seminar-roulette/seminar-roulette` in the repository and create a Python virtual environment using the command:

```
python3 -m venv venv
```

This will create a folder called `venv`. Change directory into this folder using `cd venv` and run the command:

```
source bin/activate
```

This will activate the virtual environment. You are now ready to install all of Seminar Roulette's requirements. Navigate one directory up using `cd ..` and install the requirements using pip with the following command:

```
pip install -r requirements.txt
```

## 3. Frontend

Node, npm, reqirements in package.json

## 4. Database

Install postgres and fill in database details

## 5. Single sign-on

install shibboleth

## 6. Deploy to VM

setup apache web server, install shibboleth, create SSL certificate as required by shibboleth

must be centos, red hat, etc to work with shibboleth

## 7. Configuration Files

Before seminar roulette can be successfully setup and installed, there are two files that have to be configured.

### 7.1 .env

The project stores its sensitive information inside a `.env` file. To create this file, create a copy of the [.env.example](seminar-roulette/.env.example) file given in the repository and rename it to `.env`. This file contains four variables:

- **SECRET_KEY** refers to the Django secret key. If you don't have a secret key, you can generate one using a [Django Secret Key Generator](https://djecrety.ir/).
- **DB_PASSWORD** refers to the PostgreSQL database password that you created in ??.
- **PRODUCTION** set this to `true` (case-sensitive) if you are using Seminar Roulette in a deployed environment, such as on a virtual machine. If using locally, leave this as `false`.
- **EVENTBRITE_KEY** your Eventbrite API key that you have generated from the [Eventbrite platform](https://www.eventbrite.com/platform/).

### 7.2 Eventbrite config.yaml

The repository contains a [config.yaml](seminar-roulette/config.yaml) that is responsible for knowing which Eventbrite organisers to pull in event data from. Five organiser IDs have been provided as standard but more can be added at your discretion. For example, the organiser ID `6830828415` refers to the [School of Computing Science's Eventbrite page](https://www.eventbrite.com/o/school-of-computing-science-university-of-glasgow-6830828415).

## 8. Running the Web Application

migrations, collectstatic, runserver, createsuperuser

npm run dev/prod

## 9. Testing

python manage.py test

## 10. Database population script

python event_feed.py

setup cron task if on a VM

---

Ollie Gardner
