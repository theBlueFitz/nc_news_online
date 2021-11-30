const express = require("express");
const { getArticleById, patchArticleVotesById} = require("../controllers/articles.controllers");

const articlesRouter = express.Router();

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleVotesById)

module.exports = articlesRouter;