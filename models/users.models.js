const db = require("../db/connection")

exports.fetchUsers = async () => {
    const dbOutput = await db.query(`
    SELECT username FROM users`)
    return dbOutput.rows;
}