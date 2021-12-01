const { fetchArticleById, checkArticleExists, updateArticleVotesById, fetchArticles, fetchArticlesFilterByTopic } = require("../models/articles.models");
const { setDefaultIfNeeded } = require("../utils");

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    return Promise.all([fetchArticleById(article_id), checkArticleExists(article_id)])
    .then(([article]) => {
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

exports.getArticles = (req,res,next) => {
    const {order, sort_by, topic} = req.query;
        fetchArticles(order,sort_by,topic).then((articles) => {
            res.status(200).send({articles})
        }).catch((err) => {
            next(err);
        })
}
    
    
    