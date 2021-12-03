const { fetchCommentsByArticleId } = require("../models/articles.models");
const { checkCommentExists, removeCommentById, fetchComments, changeCommentVotesByCommentId } = require("../models/comments.models");



exports.deleteCommentByCommentId = (req,res,next) => {
    const {comment_id} = req.params;
    removeCommentById(comment_id)
    .then((comment) => {
        res.status(204).send()
    }).catch((err) => {
        next(err)
    })
}

exports.getComments = (req, res, next) => {
    fetchComments()
    .then((comments) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}

exports.patchCommentVotesByCommentId = (req,res,next) => {
    const {comment_id} = req.params;
    const {inc_votes} = req.body;
    return Promise.all([changeCommentVotesByCommentId(comment_id,inc_votes),checkCommentExists(comment_id)])
    // changeCommentVotesByCommentId(comment_id,inc_votes)
    .then(([comment]) => {
        res.status(200).send({comment})
    }).catch((err) => {
        next(err)
    })
}
  
