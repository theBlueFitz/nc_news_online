const {fetchUsers, fetchSpecificUser} = require("../models/users.models")


exports.getUsers = (req,res,next) => {
    fetchUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) => {
        next(err)
    })
}

exports.getSpecificUser = (req,res,next) => {
    const {username} = req.params;
    fetchSpecificUser(username)
    .then((user) => {
        console.log(user)
        res.status(200).send({user})
    }).catch((err) => {
        next(err)
    })
}