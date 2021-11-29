const express = require('express');

const apiRouter = express.Router();

apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;