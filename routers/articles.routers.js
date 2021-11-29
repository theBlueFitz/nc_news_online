const express = require("express");
const { getArticleById } = require("../controllers/articles.controllers");

const articlesRouter = express.Router();

articlesRouter.route("/:article_id").get(getArticleById);

module.exports = articlesRouter;