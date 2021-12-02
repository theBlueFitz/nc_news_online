const db = require("../db/connection");
const { setDefaultQuery } = require("../utils");

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
        LEFT JOIN comments ON comments.article_id = articles.article_id
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

exports.fetchArticles = async (order = 'DESC',sort_by = 'created_at', topic) => {
    const queryStr1 = `SELECT articles.*, COUNT(comment_id) AS comment_count 
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id `
    if(!['ASC', 'DESC'].includes(order)) {
        return Promise.reject({status:400, msg:'Invalid order query'})
    } else if (!['article_id', 'title', 'topic', 'author', 'body', 'created_at', 'votes'].includes(sort_by)) {
        return Promise.reject({status:400, msg:'Invalid sort_by query'})
    } else if (!['mitch', 'cats', 'paper', undefined].includes(topic)) {
        return Promise.reject({status:400, msg:'Invalid topic query'})
    } else if(!topic) {
        
        const queryStr2 = `GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order};`
        const fullQuery = queryStr1.concat(queryStr2)
    const dbOutput = await db.query(fullQuery)
        return dbOutput.rows;
    } else {
        const queryStr2 = `WHERE topic = $1
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order};`
        const fullQuery = queryStr1.concat(queryStr2)
        const dbOutput = await db.query(fullQuery, [topic])
            return dbOutput.rows;
    }
}

exports.fetchCommentsByArticleId = async (article_id) => {
    const dbOutput = await db.query(
        `SELECT comment_id, votes, created_at, author, body
        FROM comments
        WHERE article_id = $1;`, [article_id])
    return dbOutput.rows;
}

exports.addCommentByArticleId = async (article_id, username, body) => {
    console.log(body.length)
    if (body.length === 0) {
        return Promise.reject({status:400, msg: 'Comment body required'})
    } else {
    const dbOutput = await db.query(
        `INSERT INTO comments (author, article_id,body)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [username, article_id, body]
    )
    return dbOutput.rows[0];
    }
}
