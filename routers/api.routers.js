const express = require('express');
const topicRouter = require("./topics.routers")

const apiRouter = express.Router();

apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;