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
    return dbOutput.rows[0];
}