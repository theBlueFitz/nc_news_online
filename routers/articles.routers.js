const express = require("express");
const { getArticleById, patchArticleVotesById, getArticles, getComments, getCommentsByArticleId} = require("../controllers/articles.controllers");

const articlesRouter = express.Router();


articlesRouter.route('/').get(getArticles)

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleVotesById)

articlesRouter.route('/:article_id/comments').get(getCommentsByArticleId)

module.exports = articlesRouter;