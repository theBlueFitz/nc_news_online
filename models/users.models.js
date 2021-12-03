const db = require("../db/connection")

exports.fetchUsers = async () => {
    const dbOutput = await db.query(`
    SELECT username FROM users`)
    return dbOutput.rows;
}

exports.fetchSpecificUser = async (username) => {
    const dbOutput = await db.query(`
    SELECT * FROM users 
    WHERE username = $1`, [username])
    if (!dbOutput.rows[0]) {
        return Promise.reject({
            status: 404,
            msg: `No user found for username: ${username}`
        })
    }
    return dbOutput.rows[0];
}

// exports.checkUserExists = async (username) => {
//     const 
// }