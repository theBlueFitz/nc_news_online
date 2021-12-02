# NC_NEWS_ONLINE
---
# Online Hosting

Link to online hosted version of api:
https://nc-news-sf.herokuapp.com/api

# Project Summary

This project was implemented to demonstrate my ability to flex my back end development muscles using a variety of techniques and packages.
It is a server that includes a database containing news articles, these articles are able to be commented on by users and voted up or down.
### (Note to self, add more details about techniques used and functionality when not knackered and won't do it half arsed)

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
 

### **STOP POINT: Hosting and README!**

- If you _have_ already hosted your app at this point, remember to push up to `heroku` your updated code
- If you haven't already hosted your app, now is the time! Follow the instructions in [hosting.md](./hosting.md)
- Write your README, including the following information:
  - [ ] Link to hosted version
  - [ ] Write a summary of what the project is
  - [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
  - [ ] Include information about how to create the two `.env` files
  - [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

**Remember that this README is targetted at people who will come to your repo (potentially from your CV or portfolio website) and want to see what you have created, and try it out for themselves(not _just_ to look at your code!). So it is really important to include a link to the hosted version, as well as implement the above `GET /api` endpoint so that it is clear what your api does.**

---

### Further Routes

#### **GET /api/users**

Responds with:

- an array of objects, each object should have the following property:
  - `username`

---

#### **GET /api/users/:username**

Responds with:

- a user object which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

#### **PATCH /api/comments/:comment_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current comment's vote property by 1

  `{ inc_votes : -1 }` would decrement the current comment's vote property by 1

Responds with:

- the updated comment

---

### _Even more_ endpoints/tasks

#### Adding pagination to GET /api/articles - adding pagination

> To make sure that an API can handle large amounts of data, it is often necessary to use **pagination**. Head over to [Google](https://www.google.co.uk/search?q=cute+puppies), and you will notice that the search results are broken down into pages. It would not be feasible to serve up _all_ the results of a search in one go. The same is true of websites / apps like Facebook or Twitter (except they hide this by making requests for the next page in the background, when we scroll to the bottom of the browser). We can implement this functionality on our `/api/articles` and `/api/comments` endpoints.

- Should accepts the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (**this should display the total number of articles with any filters applied, discounting the limit**)

---

#### Adding pagination to GET /api/articles/:article_id/comments

Should accept the following queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

---

#### POST /api/articles

Request body accepts:

- an object with the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `body`
  - `topic`

Responds with:

- the newly added article, with all the above properties as well as:
  - `article_id`
  - `votes`
  - `created_at`
  - `comment_count`

#### POST /api/topics

Request body accepts:

- an object in the form:

```json
{
  "slug": "topic name here",
  "description": "description here"
}
```

Responds with:

- a topic object containing the newly added topic

#### DELETE /api/articles/:article_id

Should:

- delete the given article by article_id

Respond with:

- status 204 and no content
