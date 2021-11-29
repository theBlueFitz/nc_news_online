const db = require("../db/connection")

exports.fetchArticleById = (article_id) => {
    // const regex = /[\d+]/g
    // if(!regex.test(article_id)) {
    //     return
    // }
    return db.query(
        `SELECT * FROM articles
        WHERE article_id = $1;`, [article_id])
        .then((response) => {
            const article = response.rows[0]
            // console.log(!article)
            // if(!article) {
            //     return Promise.reject({
            //         status: 404,
            //         msg: `No article found for article_id: ${article_id}`
            //     })
            // } else {
            // console.log(response.rows)
            return response.rows;
            // }
        })
}