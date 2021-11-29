const express = require("express");
const { getTopics } = require("../controllers/topics.controllers");

const topicRouter = express.Router();

topicRouter.route("/").get(getTopics)

module.exports = topicRouter;