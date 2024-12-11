const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const Movie = require('../models/movies');

const mongoTestUri = 'mongodb+srv://mongo:mongo@cluster0.wotmh.mongodb.net/final-project';

beforeAll(async () => {
    await mongoose.connect(mongoTestUri);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/movies', () => {
    beforeEach(async () => {
        await Movie.deleteMany({});
        
        await Movie.insertMany([
            {
                title: 'Inception',
                length: '148', 
                contentRating: 'PG-13',
                genre: 'Sci-Fi',
                yearReleased: '2010', 
                productionCompany: 'Warner Bros',
                description: 'A mind-bending thriller',
            },
            {
                title: 'Interstellar',
                length: '169',
                contentRating: 'PG-13',
                genre: 'Adventure',
                yearReleased: '2014',
                productionCompany: 'Paramount Pictures',
                description: 'A journey beyond the stars',
            },
        ]);
    });

    it('should return all movies', async () => {
        const res = await request(app).get('/api/movies');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].title).toBe('Inception');
        expect(res.body[1].title).toBe('Interstellar');
    });
});
