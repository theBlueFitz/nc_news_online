const request = require("supertest")
const app = require("../app")
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed  = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
    it("200: returns an array of topic objects" , () => {
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
    it("200: increments votes as set by inc_votes, returning updated article", () => {
        let newVote = 5;
        const voteChange = {inc_votes : newVote}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .then((response) => {
            const {updatedArticle} = response.body
            expect(updatedArticle).toEqual(
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
    it("200: decrements votes as set by inc_votes, returning updated article", () => {
        let newVote = -42;
        const voteChange = {inc_votes : newVote}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .expect(200)
        .then((response) => {
            const {updatedArticle} = response.body
            expect(updatedArticle).toEqual(
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
            expect(response.body.articles).toHaveLength(12)
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
            expect(response.body).toBeSortedBy('article_id')
        })
    })
    it('400: responds with an error msg if invalid sort_by query set', () => {
        return request(app)
        .get(`/api/articles?order=ASC&sort_by=DROP TABLES`)
        .expect(400)
        .then((response) => {
            console.log(response.body)
            expect(response.body).toEqual({msg: 'Invalid order query'})
        })
    })
    it('200: responds with an array of article objects filtered by set topic', () => {
        return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then((response) => {
            console.log(response.body)
            response.body.articles.forEach((article) => {
                expect(article).toHaveProperty('topic', 'cats')
            })
        })
    })
})