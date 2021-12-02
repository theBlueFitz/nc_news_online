const { fetchArticleById, checkArticleExists, updateArticleVotesById, fetchArticles, fetchArticlesFilterByTopic, fetchCommentsByArticleId, addCommentByArticleId } = require("../models/articles.models");
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
            if (articles.length === 0) {
                res.status(204).send();
            } else {
            res.status(200).send({articles})
            }
        }).catch((err) => {
            next(err);
        })
}

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    return Promise.all([fetchCommentsByArticleId(article_id), checkArticleExists(article_id)]) 
    .then(([comments]) => {
        if (comments.length === 0) {
            res.status(204).send()
        } else {
        res.status(200).send({comments})
        }
    }).catch((err) => {
        next(err);
    })
}
    
exports.postCommentByArticleId = (req,res,next) => {
    const {article_id} = req.params;
    const {username, body} = req.body;
    return Promise.all([checkArticleExists(article_id), addCommentByArticleId(article_id, username, body)])
    .then(([check, commentPosted]) => {
        res.status(201).send({commentPosted})
    }).catch((err) => {
        next(err);
    })
}  
    