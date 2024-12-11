const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const Review = require('../models/reviews');

const mongoTestUri = 'mongodb+srv://mongo:mongo@cluster0.wotmh.mongodb.net/final-project';

beforeAll(async () => {
    await mongoose.connect(mongoTestUri);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/reviews', () => {
    beforeEach(async () => {
        await Review.deleteMany({});
        
        await Review.insertMany([
            {
                username: 'john_doe',
                movieTitle: 'Inception',
                starRating: '5',
                description: 'A mind-bending thriller',
            },
            {
                username: 'jane_smith',
                movieTitle: 'Interstellar',
                starRating: '4',
                description: 'A journey beyond the stars',
            },
        ]);
    });

    it('should return all reviews', async () => {
        const res = await request(app).get('/api/reviews');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].movieTitle).toBe('Inception');
        expect(res.body[1].movieTitle).toBe('Interstellar');
    });
});
