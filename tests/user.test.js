const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const User = require('../models/user');

const mongoTestUri = 'mongodb+srv://mongo:mongo@cluster0.wotmh.mongodb.net/final-project';

beforeAll(async () => {
    await mongoose.connect(mongoTestUri);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/users', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        
        await User.insertMany([
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: 'password456',
            },
        ]);
    });

    it('should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe('John Doe');
        expect(res.body[1].name).toBe('Jane Smith');
    });
});
