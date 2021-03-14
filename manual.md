# User Manual

This guide serves as a manual, explaining how to install, run and test the Seminar Roulette web application. If you encouter any issues during the installation and configuration process, please contact the developer [Ollie Gardner](https://github.com/olliegardner).

## Contents

- [User Manual](#user-manual)
  - [Contents](#contents)
  - [1. Git](#1-git)
  - [2. Backend](#2-backend)
    - [2.1 Python](#21-python)
    - [2.2 Django and other Requirements](#22-django-and-other-requirements)
  - [3. Frontend](#3-frontend)
    - [3.1 Node.js](#31-nodejs)
    - [3.2 npm Packages](#32-npm-packages)
  - [4. Database](#4-database)
  - [5. Deployment & Single Sign-On](#5-deployment--single-sign-on)
  - [6. Configuration Files](#6-configuration-files)
    - [6.1 .env](#61-env)
    - [6.2 Eventbrite config.yaml](#62-eventbrite-configyaml)
  - [7. Running Seminar Roulette](#7-running-seminar-roulette)
  - [8. Testing Seminar Roulette](#8-testing-seminar-roulette)
  - [9. Database Population Script](#9-database-population-script)

## 1. Git

To retrieve the project files, you must have Git installed. To install Git, follow these [installation instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Once Git has been installed, clone the repository using the following command:

```
git clone https://github.com/olliegardner/seminar-roulette.git
```

## 2. Backend

### 2.1 Python

Seminar Roulette requires Python 3.7 or later to be installed on your machine to run. [Download Python](https://www.python.org/downloads/) and follow the installation instructions for your operating system. Check you have the correct version of Python installed by running `python --version` in your command line.

### 2.2 Django and other Requirements

Navigate to the folder `seminar-roulette/seminar-roulette/` in the repository and create a Python virtual environment using the command:

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

### 3.1 Node.js

Seminar Roulette requires Node.js 12.16.1 or later to be installed on your machine to run. [Download Node.js](https://nodejs.org/en/download/) and follow the installation instructions for your operating system. Check you have the correct version of Node.js installed by running `node -v` in your command line.

### 3.2 npm Packages

Navigate to the folder `seminar-roulette/seminar-roulette/frontend/` in the repository and install the npm requirements listed in `package.json` using the command:

```
npm install
```

## 4. Database

Seminar Roulette uses PostgreSQL as its database management system. Version 10.7 or later is required. [Download PostgreSQL](https://www.postgresql.org/download/) and follow the installation instructions for your operating system. Next, you must create a database called `seminarroulette` with the user `seminarroulette_user`. Take note of your chosen password as it will be required later. To create a database and user, enter the following in your command line:

```
sudo -u postgres psql

CREATE DATABASE seminarroulette;

CREATE USER seminarroulette_user WITH PASSWORD 'yourpassword';

GRANT ALL PRIVILEGES ON DATABASE seminarroulette to seminarroulette_user;
```

## 5. Deployment & Single Sign-On

If you are using Seminar Roulette locally then you can skip this step.

If you are deploying Seminar Roulette to a VM then you must first ensure that the VM conforms to Shibboleth's requirements. Shibboleth is the single sign-on architecture used by the University. The VM's that Shibboleth supports are listed [here](https://wiki.shibboleth.net/confluence/display/IDP4/SystemRequirements). Once you have created your VM according to Shibboleth's requirements, you must [install Shibboleth](https://wiki.shibboleth.net/confluence/display/SP3/RPMInstall).

Next, you must configure Shibboleth to pass its attributes back to the web application. These attributes can be configured in the file `/etc/shibboleth/attribute-map.xml` on your VM.

Next, setup a web server using Apache or similar. Follow [this tutorial](https://devops.ionos.com/tutorials/how-to-install-django-with-apache-on-centos-7/) to setup the Django app with Apache on CentOS 7.

Finally, Shibboleth requires an SSL certificate to be configured on the VM in order to function correctly. To create an SSL certificate on Apache for CentOS 7, follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-apache-for-centos-7).

## 6. Configuration Files

Before Seminar Roulette can be run, there are two files that have to be configured.

### 6.1 .env

The project stores its sensitive information inside a `.env` file. To create this file, create a copy of the [.env.example](seminar-roulette/.env.example) file given in the repository and rename it to `.env`. This file contains four variables:

- **SECRET_KEY** refers to the Django secret key. If you don't have a secret key, you can generate one using a [Django Secret Key Generator](https://djecrety.ir/).
- **DB_PASSWORD** refers to the PostgreSQL database password that you created in step 4.
- **PRODUCTION** set this to `true` (case-sensitive) if you are using Seminar Roulette in a deployed environment, such as on a virtual machine. If using locally, leave this as `false`.
- **EVENTBRITE_KEY** your Eventbrite API key that you have generated from the [Eventbrite platform](https://www.eventbrite.com/platform/).

### 6.2 Eventbrite config.yaml

The repository contains a [config.yaml](seminar-roulette/config.yaml) that is responsible for knowing which Eventbrite organisers to pull in event data from. Five organiser IDs have been provided as standard but more can be added at your discretion. For example, the organiser ID `6830828415` refers to the [School of Computing Science's Eventbrite page](https://www.eventbrite.com/o/school-of-computing-science-university-of-glasgow-6830828415).

## 7. Running Seminar Roulette

Multiple steps are required to run Seminar Roulette. To run the frontend, navigate to the folder `seminar-roulette/seminar-roulette/frontend/` in the repository. Run the following command if using Seminar Roulette in a local environment.

```
npm run dev
```

If using Seminar Roulette in a deployed environment, then run:

```
npm run build
```

Next, open up a new terminal window and navigate to the folder `seminar-roulette/seminar-roulette/backend/`. Activate your virtual environment using the commands stated in step 2.2. Once the virtual environment has been activated, enter the following commands:

```
python manage.py makemigrations backend

python manage.py migrate

python manage.py collectstatic
```

If running locally, then make sure you create a user account and run the server. If using deployed, do not run these commands as the single sign-on will handle authentication and your web server will handle the running of the web app.

```
python manage.py createsuperuser

python manage.py runserver
```

## 8. Testing Seminar Roulette

Seminar Roulette contains a suite of backend unit tests. These can be ran by navigating to `seminar-roulette/seminar-roulette/backend/` and activating the Python virtual environment. Run the unit tests using the following command:

```
python manage.py test
```

If you have successfully setup and configured Seminar Roulette then all these unit tests will pass.

## 9. Database Population Script

Once setup, you will notice that there is no data on the system. The [event_feed.py](seminar-roulette/event_feed.py) file contains a script that will populate the database with data from Samoa Events and Eventbrite. To execute this script, run the following command:

```
python event_feed.py
```

If using Seminar Roulette within a deployed environment, it is highly recommended that you setup a cron task to run the script nightly to ensure that the most up to date information always displays on Seminar Roulette. To setup a automatic cron task on CentOS, follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-centos-8).

---

Ollie Gardner
