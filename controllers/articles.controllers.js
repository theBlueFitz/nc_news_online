const { fetchArticleById, checkArticleExists, updateArticleVotesById } = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    return Promise.all([fetchArticleById(article_id), checkArticleExists(article_id)])
    .then(([article]) => {
        console.log({article})
        res.status(200).send({article});
    })
    .catch((err) => {
        next(err);
    })
}

exports.patchArticleVotesById = (req,res,next) => {
    const {article_id} = req.params;
    const {inc_votes} = req.body;
    const idToChangeAndVotes = [article_id,inc_votes]
    return Promise.all([updateArticleVotesById(idToChangeAndVotes),
    checkArticleExists(article_id)])
    .then(([updatedArticle]) => {
        res.status(200).send({updatedArticle})
    })
    .catch((err) => {
        next(err);
    })
}