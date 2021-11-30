const express = require("express");
const { getArticleById, patchArticleVotesById, getArticles} = require("../controllers/articles.controllers");

const articlesRouter = express.Router();

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleVotesById)

articlesRouter.route('/').get(getArticles)

module.exports = articlesRouter;