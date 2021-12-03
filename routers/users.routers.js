const express = require("express");
const { getUsers, getSpecificUser } = require("../controllers/users.controllers");

const usersRouter = express.Router();

usersRouter.route('/').get(getUsers);

usersRouter.route('/:username').get(getSpecificUser)

module.exports = usersRouter;