const request = require('supertest');
const app = require('../app');

describe('API health check', () => {
  it('GET / should return API running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Optimal Protect PPE API is running...');
  });
});