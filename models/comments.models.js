const db = require("../db/connection")

// exports.checkCommentExists = async (comment_id) => {
//     const dbOutput = await db.query(
//         `SELECT * FROM comments
//         WHERE comment_id = $1`, [comment_id])
//     if (!dbOutput.rows[0]) {
//         return Promise.reject({
//             status: 404,
//             msg: `No comment found for comment_id: ${comment_id}`
//         })
//     } else {
//         return comment_id;
//     }
// }

exports.removeCommentById = async (comment_id) => {
    const dbOutput = await db.query(
        `DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *`, [comment_id]
    )
    if (!dbOutput.rows[0]) {
        return Promise.reject({
            status: 404,
            msg: `No comment found for comment_id: ${comment_id}`
        })
    }
    return dbOutput;
}

exports.fetchComments = async () => {
    const dbOutput = await db.query(
        `SELECT * FROM comments`
    )
    return dbOutput.rows;
}