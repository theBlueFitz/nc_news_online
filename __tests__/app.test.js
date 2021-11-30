const request = require("supertest")
const app = require("../app")
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed  = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/treasures", () => {
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
            expect(response.body.article).toHaveLength(1)
            expect(response.body.article[0]).toEqual(
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
    it("200: increments & decrements votes as set by inc_votes, returning updated article", () => {
        let newVote = 5;
        const voteChange = {inc_votes : newVote}
        return request(app)
        .patch('/api/articles/2')
        .send(voteChange)
        .then((response) => {
            // console.log(response);
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
})