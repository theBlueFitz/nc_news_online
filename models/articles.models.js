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
            return response.rows[0];
        })
}

exports.updateArticleVotesById = async (idToChangeAndVotes) => {
    const dbOutput = await db.query(
        `UPDATE articles
        SET votes =  votes + $2
        WHERE article_id = $1
        RETURNING *`,
        idToChangeAndVotes
    )
    return dbOutput.rows[0];
}

exports.fetchArticles = async (order) => {
    if (!order) {
        const dbOutput = await db.query(
            `SELECT articles.*, COUNT(comment_id) AS comment_count 
            FROM articles
            LEFT JOIN comments ON comments.article_id = articles.article_id
            GROUP BY articles.article_id
            ORDER BY articles.created_at DESC;`)
            return dbOutput.rows;
    } else if(!['ASC', 'DESC'].includes(order)) {
        return Promise.reject({status:400, msg:'Invalid order query'})
    } else {
    const dbOutput = await db.query(
        `SELECT articles.*, COUNT(comment_id) AS comment_count 
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at ${order};`)
        return dbOutput.rows;
    }
}