const { fetchArticleById, checkArticleExists, updateArticleVotesById, fetchArticles, fetchArticlesFilterByTopic, fetchCommentsByArticleId, addCommentByArticleId, checkTopicExists, fetchAllArticles } = require("../models/articles.models");
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
    .then(([article]) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err);
    })
}

exports.getArticles = (req,res,next) => {
    const {order, sort_by, topic, limit,p} = req.query;
        return Promise.all([fetchArticles(order,sort_by,topic,limit,p),fetchAllArticles(order,sort_by,topic),checkTopicExists(topic)])
        .then(([articles, total_count]) => {
            res.status(200).send({articles: articles, total_count: total_count})
        }).catch((err) => {
            next(err);
        })
}

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    return Promise.all([fetchCommentsByArticleId(article_id), checkArticleExists(article_id)]) 
    .then(([comments]) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err);
    })
}
    
exports.postCommentByArticleId = (req,res,next) => {
    const {article_id} = req.params;
    const {username, body} = req.body;
    addCommentByArticleId(article_id, username, body)
    .then((comment) => {
        res.status(201).send({comment: comment.body})
    }).catch((err) => {
        next(err);
    })
}  
    