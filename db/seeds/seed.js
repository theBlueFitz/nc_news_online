const db = require("../connection")
const format = require("pg-format")

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
  .query(`DROP TABLE IF EXISTS 
  topics,
  users,
  articles,
  comments;`)
  .then(() => {
    return db.query(`CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY NOT NULL,
      description VARCHAR NOT NULL
    );`)
  })
  .then( () => { return db.query(`CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    avatar_url VARCHAR,
    name VARCHAR
  );`)
})
.then(() => {
  return db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR,
    body TEXT,
    votes INT DEFAULT 0,
    topic VARCHAR NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
    author VARCHAR NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
  );`)
}).then(() => {
  return db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
    votes INT NOT NULL DEFAULT 0,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    body VARCHAR 
  );`)
}).then(() => {
  formattedTopics = topicData.map((topic) => {
    return [topic.slug, topic.description]
  }) 
    const querySTR = format(
      `INSERT INTO topics
      (slug, description)
      VALUES
      %L
      RETURNING *;`, formattedTopics)
    return db.query(querySTR)
  }).then(() => {
    const formattedUsers = userData.map((user) => {
      return [user.username, user.avatar_url, user.name];
    });
    const queryStr = format(
      `INSERT INTO users
      (username, avatar_url, name)
      VALUES
      %L
      RETURNING *;`, formattedUsers)
      return db.query(queryStr)
  }).then(() => {
    const formattedArticles = articleData.map((article) => {
      return [article.title,article.body,article.votes,article.topic,article.author,article.created_at]
    })
    const queryStr = format(
      `INSERT INTO articles
      (title, body, votes, topic, author, created_at)
      VALUES
      %L
      RETURNING *;`, formattedArticles
    )
    return db.query(queryStr)
  }).then(() => {
    const formattedComments = commentData.map((comment) => {
      return [comment.author, comment.article_id, comment.votes,comment.created_at,comment.body]
    })
    const queryStr = format(
      `INSERT INTO comments
      (author, article_id, votes, created_at, body)
      VALUES
      %L
      RETURNING *;`, formattedComments
    )
    return db.query(queryStr)
  })
  
};


module.exports = seed;
