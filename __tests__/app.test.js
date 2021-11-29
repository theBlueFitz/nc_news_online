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
        .get(`/api/articles/4`)
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty("article");
            expect(response.body.article).toHaveLength(1)
            expect(response.body.article[0]).toEqual(
                expect.objectContaining(
                    {
                        article_id: 4,
                        title: 'Student SUES Mitch!',
                        body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
                        votes: 0,
                        topic: 'mitch',
                        author: 'rogersop',
                        created_at: '2020-05-05T23:00:00.000Z'
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
            console.log(response.body)
            expect(response.body).toEqual({msg: "No article found for article_id: 1000000"})
        })
    })
})