const express = require('express');
const articlesRouter = require('./articles.routers');
const topicRouter = require("./topics.routers")

const apiRouter = express.Router();

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;