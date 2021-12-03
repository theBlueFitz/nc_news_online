const { fetchCommentsByArticleId } = require("../models/articles.models");
const { checkCommentExists, removeCommentById, fetchComments } = require("../models/comments.models");



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
  
