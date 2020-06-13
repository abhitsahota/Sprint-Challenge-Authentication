const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')

test('should be the testing environment', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('server.js', () => {

  beforeEach(async () => {
    await db('users').truncate()
  })

  describe('register route', () => {
    it('should return an OK status code from the register route', async () => {
      const expectedStatusCode = 200;
      const response = await request(server)
      .post('/api/auth/register')
      .send({username: "bob", password: "burger"});
      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object from the register route', async () => {
      const response = await request(server)
      .post('/api/auth/register');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('login route', () => {

    it('should return an OK status code from the login route', async () => {
      await request(server)
      .post('/api/auth/register')
      .send({username: "bob", password: "burger"});

      const expectedStatusCode = 200;

      const response = await request(server)
      .post('/api/auth/login').send({username: "bob", password: "burger"});
      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object from the login route', async () => {
      const response = await request(server)
      .post('/api/auth/login').send({username: "bob", password: "burger"});
      expect(response.type).toEqual('application/json');
    });
  });

});