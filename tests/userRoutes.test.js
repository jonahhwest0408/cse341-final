const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Mock MongoDB URI
const mongoTestUri = 'mongodb://127.0.0.1:27017/testdb';

beforeAll(async () => {
  await mongoose.connect(mongoTestUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User API Routes', () => {
  it('GET /api/users - should return an empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/users - should create a new user', async () => {
    const newUser = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newUser.name);
  });

  it('PUT /api/users/:id - should update an existing user', async () => {
    const newUser = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };
    const createdUser = await request(app).post('/api/users').send(newUser);
  
    const updatedData = { name: 'Jane Smith' };
    const res = await request(app).put(`/api/users/${createdUser.body._id}`).send(updatedData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
  });

  it('DELETE /api/users/:id - should delete a user', async () => {
    const newUser = { name: 'John Doe', email: 'john2@example.com', password: 'password123' };
    const createdUser = await request(app).post('/api/users').send(newUser);

    const res = await request(app).delete(`/api/users/${createdUser.body._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');
  });
});
