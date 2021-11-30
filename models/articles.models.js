const db = require("../db/connection")

exports.checkArticleExists = async (article_id) => {
    const dbOutput = await db.query(`SELECT * FROM articles
    WHERE article_id = $1;`, [article_id]);
    if (!dbOutput.rows[0]) {
        return Promise.reject({
            status: 404,
            msg: `No article found for article_id: ${article_id}`
        })
    }
}
exports.fetchArticleById = (article_id) => {
    return db.query(
        `SELECT articles.*, COUNT(comment_id) AS comment_count 
        FROM articles
        JOIN comments ON comments.article_id = articles.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;`, [article_id])
        .then((response) => {
            return response.rows;
        })
}
