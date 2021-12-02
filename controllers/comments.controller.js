const { checkCommentExists, removeCommentById } = require("../models/comments.models");



exports.deleteCommentByCommentId = (req,res,next) => {
    const {comment_id} = req.params;
    checkCommentExists(comment_id)
    .then((comment_id) => {
        removeCommentById(comment_id)
        .then((comment) => {
            res.status(204).send()
        }).catch((err) => {
            next(err);
        })
    }).catch((err) => {
        next(err)
    })
}


    // return Promise.all([removeCommentById(comment_id), checkCommentExists(comment_id)])
    // // removeCommentById(comment_id)
    // .then(([comment]) => {
    //     res.status(204).send(comment)
    // }).catch((err) => {
    //     next(err);
    // })
