const express = require('express');
const articlesRouter = require('./articles.routers');
const commentsRouter = require('./comments.routers');
const topicRouter = require("./topics.routers")

const apiRouter = express.Router();

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;