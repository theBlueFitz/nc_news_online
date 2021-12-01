const express = require("express");
const { getArticleById, patchArticleVotesById, getArticles, getCommentsByArticleId, postCommentByArticleId} = require("../controllers/articles.controllers");

const articlesRouter = express.Router();


articlesRouter.route('/').get(getArticles)

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleVotesById)

articlesRouter.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(postCommentByArticleId)

module.exports = articlesRouter;