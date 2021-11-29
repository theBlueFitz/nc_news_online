const express = require("express");

const topicRouter = express.Router();

topicRouter.route("/").get(getTopcis)

module.exports = topicRouter;