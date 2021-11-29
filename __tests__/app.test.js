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
        })
    }) 
})