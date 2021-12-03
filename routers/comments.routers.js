const express = require("express");
const { deleteCommentByCommentId, getComments, patchCommentVotesByCommentId } = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter.route('/').get(getComments)

commentsRouter.route('/:comment_id').delete(deleteCommentByCommentId).patch(patchCommentVotesByCommentId)

module.exports = commentsRouter;