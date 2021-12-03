const express = require('express');
const articlesRouter = require('./articles.routers');
const commentsRouter = require('./comments.routers');
const topicRouter = require("./topics.routers")
const endpoints = require("../endpoints.json");
const usersRouter = require('./users.routers');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send(endpoints);
})

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter)

module.exports = apiRouter;