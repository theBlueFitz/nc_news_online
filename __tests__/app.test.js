const request = require("supertest")
const app = require("../app")
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed  = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
    it("200: responds with an array of topic objects" , () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
           expect(response.body.topics).toBeInstanceOf(Array);
           expect(response.body).toHaveProperty("topics");
           expect(response.body.topics).toHaveLength(3);
           response.body.topics.forEach((topic) => {
               expect(topic).toEqual(
                   expect.objectContaining({
                       slug: expect.any(String),
                       description: expect.any(String)
                   })
               )
           })
        })
    }) 
    it("400: responds with an error message if bad file path used", () => {
        return request(app)
        .get('/apu/hummuna')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Path not found"})
        })
    })
})

describe("GET /api/articles/:article_id", () => {
    it("200: responds with an object with a specific article and matching article_id", () => {
        return request(app)
        .get(`/api/articles/3`)
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty("article");
            expect(response.body.article).toEqual(
                expect.objectContaining(
                    {
                        article_id: 3,
                        title: 'Eight pug gifs that remind me of mitch',
                        body: 'some gifs',
                        votes: 0,
                        topic: 'mitch',
                        author: 'icellusedkars',
                        created_at: "2020-11-03T00:00:00.000Z",
                        comment_count: "2"
                      }
                )
            )
        })
    })
    it("404: responds with invalid request message if article doesn't exist", () => {
        return request(app)
        .get('/api/articles/1000000')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: "No article found for article_id: 1000000"})
        })
    })
    it("400: responds with invalid request with incorrect input", () => {
    return request(app)
        .get('/api/articles/chipmunk')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Invalid request"})
    })
})
})

describe("PATCH /api/articles/:article_id", () => {
    it("200: increments votes as set by inc_votes, responding with an updated article", () => {
        let newVote = 5;
        const voteChange = {inc_votes : newVote}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .then((response) => {
            const {article} = response.body
            expect(article).toEqual(
                expect.objectContaining({
                    article_id: 2,
                    title: 'Sony Vaio; or, The Laptop',
                    topic: 'mitch',
                    author: 'icellusedkars',
                    body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                    created_at: "2020-10-15T23:00:00.000Z",
                    votes: 5
                })
            )
        })
    })
    it("200: decrements votes as set by inc_votes, responding with updated article", () => {
        let newVote = -42;
        const voteChange = {inc_votes : newVote}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .expect(200)
        .then((response) => {
            const {article} = response.body
            expect(article).toEqual(
                expect.objectContaining({
                    article_id: 2,
                    title: 'Sony Vaio; or, The Laptop',
                    topic: 'mitch',
                    author: 'icellusedkars',
                    body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                    created_at: "2020-10-15T23:00:00.000Z",
                    votes: -42
                })
            )
        })
    })
    it("200: responds with an unchanged article if inc_votes key is missing", () => {
        let newVote = -42;
        const voteChange = {}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .expect(200)
        .then((response) => {
            const {article} = response.body
            expect(article).toEqual(
                expect.objectContaining({
                    article_id: 2,
                    title: 'Sony Vaio; or, The Laptop',
                    topic: 'mitch',
                    author: 'icellusedkars',
                    body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                    created_at: "2020-10-15T23:00:00.000Z",
                    votes: 0
                })
            )
        })
    })
    it("400: responds with a status error if invalid data type is tried in req", () => {
        let newVote = "DROP TABLE";
        const voteChange = {inc_votes : newVote}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Invalid request"})
        })
    })

    it("404: responds with invalid request message if article doesn't exist", () => {
        return request(app)
        .patch('/api/articles/1000000')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: "No article found for article_id: 1000000"})
        })
    })
    it("400: responds with invalid request with incorrect input", () => {
        return request(app)
            .patch('/api/articles/chipmunk')
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual({msg: "Invalid request"})
        })
    })
})

describe("GET /api/articles", () => {
    it("200: responds with an array of article objects", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body.articles)).toBe(true);
            expect(response.body.articles).toHaveLength(10)
            expect(response.body).toHaveProperty('total_count', 12)
        })
    })
    it("200: responds with an array of article objects default sorted by descending date order", () => {
        return request(app)
        .get(`/api/articles`)
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', {descending:true})
        })
    })
    it("200: responds with an array of article objects sorted by ascending date order if set", () => {
        return request(app)
        .get(`/api/articles?order=ASC`)
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at')
        })
    })
    it("400: responds with an error of invalid request if order set to anything other than ASC || DESC", () => {
        return request(app)
        .get(`/api/articles?order=DROP DATABASE IF EXISTS`)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: 'Invalid order query'})
        })
    })
    it('200: responds with an array of article objects as per selected queries when both set', () => {
        return request(app)
        .get('/api/articles?order=ASC&sort_by=article_id')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('article_id')
        })
    })
    it('400: responds with an error msg if invalid sort_by query set', () => {
        return request(app)
        .get(`/api/articles?order=ASC&sort_by=DROP TABLES`)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: 'Invalid sort_by query'})
        })
    })
    it('200: responds with an array of article objects filtered by set topic', () => {
        return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then((response) => {
            response.body.articles.forEach((article) => {
                expect(article).toHaveProperty('topic', 'cats')
            })
        })
    })
    it('200: responds with an empty array if topic exists but no articles reference it', () => {
        return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({articles: [], total_count: 0})
            })
        })
    it('404: responds with an error message if topic does not exist', () => {
            return request(app)
            .get(`/api/articles?topic=DROP TABLES`)
            .expect(404)
            .then((response) => {
                expect(response.body).toEqual({msg: "No topic found for topic: DROP TABLES"})
            })
    })
    it("200: accepts a limit query and responds with an array of articles within that limit, total count is unaffected", () => {
        return request(app)
        .get('/api/articles?limit=3')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toHaveLength(3);
            expect(response.body.total_count).toBe(12);
        })
    })
    it("400: responds with an error message if invalid data type for limit query", () => {
        return request(app)
        .get('/api/articles?limit=35DROP D4A1TABA24SE')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'})
        })
    })
    it("400: responds with an error message if client tries to set limit to 0", () => {
        return request(app)
        .get('/api/articles?limit=0')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'})
        })
    })
    it("400: responds with an error message if client tries to set limit to float", () => {
        return request(app)
        .get('/api/articles?limit=3.5')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'})
        })
    })
    it("200: accepts a p query and responds with an array of articles starting at p, total count is unaffected", () => {
        return request(app)
        .get('/api/articles?p=3')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toHaveLength(9);
            expect(response.body.total_count).toBe(12);
        })
    })
    it("400: responds with an error message if client tries to set p > limit", () => {
        return request(app)
        .get('/api/articles?p=15')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid page query'})
        })
    })
    it("400: responds with an error message if client tries to set p to NaN", () => {
        return request(app)
        .get('/api/articles?p=kumquat')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid page query'})
        })
    })
    it.only("200: responds with an array of articles when all possible queries set", () => {
        return request(app)
        .get('/api/articles?limit=8&p=3&order=ASC&sort_by=article_id&topic=mitch')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toHaveLength(8);
            expect(response.body.total_count).toBe(11);
            expect(response.body.articles).toBeSortedBy('article_id');
            expect(response.body.articles[0]).toEqual(
                expect.objectContaining({
                    article_id: 4,
                    title: 'Student SUES Mitch!',
                    topic: 'mitch',
                    author: 'rogersop',
                    body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
                    created_at:  "2020-05-05T23:00:00.000Z",
                    votes: 0,
                    comment_count: 0
                  })
            )
        })
    })
})

describe("GET /api/articles/:article_id/comments", () => {
    it("200: responds with an array of comments", () => {
        return request(app)
        .get('/api/articles/9/comments')
        .expect(200)
        .then((response) => {
            expect(response.body.comments).toHaveLength(2)
            response.body.comments.forEach((comment) => {
                expect(comment).toEqual(
                    expect.objectContaining({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String)
                    })
                )
            })

        })
    })
    it("200: responds with an empty array if article exists but no comments connected", () => {
        return request(app)
        .get('/api/articles/4/comments')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({comments: []});
        })
    })
    it('404: responds with an error if article_id does not yet exist', () => {
        return request(app)
        .get('/api/articles/150000/comments')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: "No article found for article_id: 150000"})
        })
    })
    it('400: responds with an error if article_id is invalid data type', () => {
        return request(app)
        .get(`/api/articles/DROP TABLES/comments`)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Invalid request"})
        })
    })
    it('200: responds with an array of comments limited to 10 by default', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response) => {
            expect(response.body.comments).toHaveLength(10);
        })
    })
    it('200: responds with an array of comments corresponding to limit setting', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=3')
        .expect(200)
        .then((response) => {
            expect(response.body.comments).toHaveLength(3);
        })
    })
    it('400: responds with an error message if limit is a negative number', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=-3')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'});
        })
    })
    it('400: responds with an error message if limit is 0', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=0')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'});
        })
    })
    it('400: responds with an error message if limit is a float', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=4.5')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'});
        })
    })
    it('400: responds with an error message if limit is an invalid data type', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=3 DROP 45 TABLES')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid limit query'});
        })
    })
    it('200: responds with an array of comments offset by page setting', () => {
        return request(app)
        .get('/api/articles/1/comments?p=4')
        .expect(200)
        .then((response) => {
            expect(response.body.comments).toHaveLength(8);
        })
    })
    it('400: responds with an error message if p is invalid data type', () => {
        return request(app)
        .get('/api/articles/1/comments?p=DROP TABLES')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid page query'});
        })
    })
    it('400: responds with an error message if p > limit', () => {
        return request(app)
        .get('/api/articles/1/comments?p=5&limit=3')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg : 'Invalid page query'});
        })
    })
})

describe("POST api/articles/:article_id/comments", () => {
    it('201: adds new comment to the article and responds with comment', () => {
        const newComment = {
            username: 'lurker',
            body: 'Oh dear, looks like I need to change my username' 
        }
        return request(app)
        .post('/api/articles/8/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    
                    comment: 'Oh dear, looks like I need to change my username',
                    
                })
            );
        })
    })
    it('201: only allows client to set username and body', () => {
        const newComment = {
            comment_id: 1,
            username: 'lurker',
            body: 'Oh dear, looks like I need to change my username', 
            article_id: 5,
            votes: 1000000,
            created_at: 'Ha ha jokes on you'
        }
        return request(app)
        .post('/api/articles/8/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    comment: 'Oh dear, looks like I need to change my username'
                })
            );
        })
    })
    it('404: will not allow client to comment on article that doesn"t exist', () => {
        const newComment = {
            comment_id: 1,
            username: 'lurker',
            body: 'Oh dear, looks like I need to change my username', 
            votes: 1000000,
            created_at: 'Ha ha jokes on you'
        }
        return request(app)
        .post('/api/articles/100000/comments')
        .send(newComment)
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: `Does not exist`})
        })
    })
    it('400: will not allow client to use bad file path', () => {
        const newComment = {
            comment_id: 1,
            username: 'lurker',
            body: 'Oh dear, looks like I need to change my username', 
            article_id: 5,
            votes: 1000000,
            created_at: 'Ha ha jokes on you'
        }
        return request(app)
        .post('/api/articles/potato/comments')
        .send(newComment)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Invalid request"})
        })
    })
    it('400: will not allow client to post blank comment', () => {
        const newComment = {
            comment_id: 1,
            username: 'lurker',
            body: '', 
            article_id: 5,
            votes: 1000000,
            created_at: 'Ha ha jokes on you'
        }
        return request(app)
        .post('/api/articles/8/comments')
        .send(newComment)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: 'Comment body required'})
        })
    })
    it("400: responds with an error message if missing required post fields", () => {
        const newComment = {
            body: 'test test test'
        }
        return request(app)
        .post('/api/articles/8/comments')
        .send(newComment)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: 'Invalid criteria'})
        })
    })
})

describe("DELETE /api/comments/:comment_id", () => {
    it("204: deletes a comment with corresponding comment_id", () => {
        return request(app)
        .delete('/api/comments/7')
        .expect(204)
        .then((nilpoint) => {
            expect(nilpoint.body).toEqual({});
        })
    })
    it("404: responds with an error message if comment doesn't exist", () => {
        return request(app)
        .delete('/api/comments/100000')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: "No comment found for comment_id: 100000"})
        })
    })
    it("400: responds with an error message if invalid data type for comment_id", () => {
        return request(app)
        .delete('/api/comments/DROP TABLES')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Invalid request"})
        })
    })
})

describe("GET /api", () => {
    it("200: responds with a JSON object of all possible endpoints", () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    "GET /api": {
                      "description": "serves up a json representation of all the available endpoints of the api"
                    },
                    "GET /api/topics": {
                      "description": "serves an array of all topics",
                      "queries": [],
                      "exampleResponse": {
                        "topics": [{ "slug": "football", "description": "Footie!" }]
                      }
                    },
                    "GET /api/articles": {
                      "description": "serves an array of all topics",
                      "queries": ["author", "topic", "sort_by", "order"],
                      "exampleResponse": {
                        "articles": [
                          {
                            "title": "Seafood substitutions are increasing",
                            "topic": "cooking",
                            "author": "weegembump",
                            "body": "Text from the article..",
                            "created_at": 1527695953341
                          }
                        ]
                      }
                    },
                    "GET /api/comments" : {
                      "description": "serves an array of all comments",
                      "queries": [],
                      "exampleResponse": {
                        "comments": 
                           [
                            {
                              "body": "Superficially charming",
                              "votes": 0,
                              "author": "icellusedkars",
                              "article_id": 1,
                              "created_at": "new Date(1577848080000)"
                            }
                          ] 
                      }
                    },
                    "GET /api/articles/:article_id" : {
                      "description": "serves an object with a single article selected by id",
                      "queries" : [],
                      "exampleResponse": {
                        "article": {
                          "title": "Sony Vaio; or, The Laptop",
                          "topic": "mitch",
                          "author": "icellusedkars",
                          "body": "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                          "created_at": "new Date(1602828180000)",
                          "votes": 0
                        }
                      }
                    },
                    "PATCH /api/articles/:article_id" : {
                      "description" : "Increments or decrements article votes returning the article with new vote count",
                      "examplePatch" : { "inc_votes" : 1 },
                      "exampleResponse": {
                        "updatedArticle": {
                          "title": "Sony Vaio; or, The Laptop",
                          "topic": "mitch",
                          "author": "icellusedkars",
                          "body": "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                          "created_at": "new Date(1602828180000)",
                          "votes": 0
                        }
                      }
                    },
                    "GET /api/articles/:article_id/comments" : {
                      "description" : "Responds with an array of comments corresponding to an article ID",
                      "queries": [],
                      "exampleResponse": {
                        "comments": [
                          {
                            "comment_id": 1,
                            "votes": 16,
                            "created_at": "2020-04-05T23:00:00.000Z",
                            "author": "butter_bridge",
                            "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
                          },
                          {
                            "comment_id": 17,
                            "votes": 20,
                            "created_at": "2020-03-14T00:00:00.000Z",
                            "author": "icellusedkars",
                            "body": "The owls are not what they seem."
                          }
                        ]
                      }
                    },
                    "POST /api/articles/:article_id/comments" : {
                      "description": "posts a new comment on article with corresponding article_id",
                      "queries": [],
                      "examplePost": {
                        "username": "lurker",
                        "body": "Oh dear, looks like I need to change my username" 
                        },
                        "example response": {
                          "commentPosted" : [
                            {
                              "comment_id": 7,
                              "author": "icellusedkars",
                              "article_id": 1,
                              "votes": 0,
                              "created_at": "2020-05-14T23:00:00.000Z",
                              "body": "Lobster pot"
                            }
                          ]
                        }
                    },
                    "DELETE /api/comments/:comment_id" : {
                      "description": "deletes a comment with specified id"
                    }
                  })
            )
            })
    })
})

describe("GET api/users", () => {
    it("200: responds with an array of users", () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
            const users = response.body.users
            expect(users).toHaveLength(4)
            users.forEach((user) => {
                expect(user).toEqual(
                    expect.objectContaining({
                        username: expect.any(String)
                    })
                )
            })
        })
    })
    it("400: responds with an error message if bad urlpath used", () => {
        return request(app)
        .get('/api/yousers')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: "Path not found"})
        })
    })
})

describe("GET /api/users/:username", () => {
    it("200: responds with a user object", () => {
        return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({user: {
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url:
                  'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
              }})
        })
    })
    it("404: responds with an error message if username doesn't exist", () => {
        return request(app)
        .get('/api/users/beelzebub')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: `No user found for username: beelzebub`})
        })
    })
})

describe("PATCH /api/comments/:comment_id", () => {
    it("200: increments comment votes by set votes", () => {
        const newVotes = 200
        const voteChange = {inc_votes : newVotes}
        return request(app)
        .patch("/api/comments/5")
        .send(voteChange)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining( {comment :
                    {
                    article_id: 1,
                    comment_id: 5,
                    body: "I hate streaming noses",
                    votes: 200,
                    author: "icellusedkars",
                    article_id: 1,
                    created_at: "2020-11-03T00:00:00.000Z",
                  }})
            )
        })
    })
    it("200: decrements comment votes by set votes", () => {
        const newVotes = -200
        const voteChange = {inc_votes : newVotes}
        return request(app)
        .patch("/api/comments/5")
        .send(voteChange)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining( {comment :
                    {
                    article_id: 1,
                    comment_id: 5,
                    body: "I hate streaming noses",
                    votes: -200,
                    author: "icellusedkars",
                    article_id: 1,
                    created_at: "2020-11-03T00:00:00.000Z",
                  }})
            )
        })
    })
    it("200: comment is unaffected if inc_votes is missing", () => {
        const newVotes = -200
        const voteChange = {money:5000000}
        return request(app)
        .patch("/api/comments/5")
        .send(voteChange)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining( {comment :
                    {
                    article_id: 1,
                    comment_id: 5,
                    body: "I hate streaming noses",
                    votes: 0,
                    author: "icellusedkars",
                    article_id: 1,
                    created_at: "2020-11-03T00:00:00.000Z",
                  }})
            )
        })
    })
    it("404: responds with an error message if comment does not exist", () => {
        const newVotes = -200
        const voteChange = {inc_votes : newVotes}
        return request(app)
        .patch('/api/comments/1000000')
        .send(voteChange)
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({msg: 'No comment found for comment_id: 1000000'})
        })
    })
    it("400: responds with an error message if bad urlpath used", () => {
        const newVotes = -200
        const voteChange = {inc_votes : newVotes}
        return request(app)
        .patch('/api/comments/DROP TABLES')
        .send(voteChange)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: 'Invalid request'})
        })
    })
    it("400: responds with an error message if invalid data type used", () => {
        const newVotes = 'BAJILLION';
        const voteChange = {inc_votes : newVotes}
        return request(app)
        .patch('/api/comments/5')
        .send(voteChange)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({msg: 'Invalid request'})
        }) 
    })
})

describe.only('GET /api/articles', () => {
    it('200: responds with an array of articles sorted by comment count', () => {
        return request(app)
        .get('/api/articles?sort_by=comment_count')
        .expect(200)
        .then((res) => {
            expect(res.body.articles).toBeSortedBy('comment_count', {descending:true})
        })
    })
})