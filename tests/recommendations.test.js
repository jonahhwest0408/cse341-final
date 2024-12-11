const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Recommendation = require('../models/recommendations');

const mongoTestUri = 'mongodb+srv://mongo:mongo@cluster0.wotmh.mongodb.net/final-project';

beforeAll(async () => {
    await mongoose.connect(mongoTestUri);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/recommendations', () => {
    beforeEach(async () => {
        await Recommendation.deleteMany({});

        await Recommendation.insertMany([
            {
                username: 'john_doe',
                movieTitle: 'Inception',
                recommendation: 'Great movie, highly recommend!',
            },
            {
                username: 'jane_smith',
                movieTitle: 'Interstellar',
                recommendation: 'A fantastic space adventure!',
            },
        ]);
    });

    it('should return all recommendations', async () => {
        const res = await request(app).get('/api/recommendations');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].username).toBe('john_doe');
        expect(res.body[1].username).toBe('jane_smith');
    });
});
