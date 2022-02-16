# NC_NEWS_ONLINE

---

# Online Hosting

Link to online hosted version of api:
https://nc-news-sf.herokuapp.com/api

# Project Summary

This project was implemented to demonstrate my ability to flex my back end development muscles using a variety of techniques and packages.
It is a server that includes a development and test psql database containing data that is interrelated with multiple endpoints and http request functionality.
It makes use of express routeing and the MVC model to ensure it is RESTful, pre-seeding the database when tests are ran. Queriable endpoints have been sanitised to prevent SQL injection.

# Copying the repo

---

Please follow the instructions below in order to clone your own copy of the repository:

- Click on the FORK button in the top right hand corner of the page, then select your username, this should create a copy of the repository in your online github storage.
- Next on your OWN online version of the repo, click on the CODE button highlighted in GREEN, copy the URL provided.
  (It should look something like this `https://github.com/<your username here>/nc_news_online.git`)
- You should now be able to to CLONE the repo using your CLI, type the following in order to do so:
  `git clone https://github.com/<your username here>/nc_news_online.git`
  -There will be a message like this if successful:

```http
Cloning into 'be-nc-games'...
remote: Enumerating objects: 642, done.
remote: Counting objects: 100% (123/123), done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 642 (delta 99), reused 91 (delta 90), pack-reused 519
Receiving objects: 100% (642/642), 296.55 KiB | 4.01 MiB/s, done.
Resolving deltas: 100% (310/310), done.
```

- Ensure npm is initialised using the command `npm init -y`
- You will then need to install the following dependencies using `npm install <dependecy name>`:

  - [ ] dotenv
  - [ ] express
  - [ ] pg
  - [ ] pg-format

- If you need to do any testing/development yourself, the following dependencies will need to be installed using the command `npm install -D < dependency name>:

  - [ ] jest
  - [ ] jest-sorted
  - [ ] supertest

- Seeding local db and running test
- The setup for the databases are already done for you, you simply need to run the script (you can see the script in yout package.json) in the following order:
- `npm setup-dbs`: this will create the databases
- `npm seed`: this will run the seed file to populate the databases

# NB if you want to run any testing you first need to set up your .ENV files

- Create 2 files, one called `.env.test`, the other `.env.development`,
- In these files you need to set up your PGDATABASE and PGPASSWORD manually as per example below:
- FOR DEVELOPMENT

```http
PGDATABASE = nc_news
PGPASSWORD = <your_password>
```

- FOR TESTING

```http
PGDATABASE = nc_news_test
PGPASSWORD = <your_password>
```

- You should now be able to run tests by running the command `npm test`

NOTE: Minimum required versions of Node.js = v17.1.0, Postgres = v8.7.1

---
