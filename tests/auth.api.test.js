/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
// reference to you app.js file
const req = request(app);

describe('/api/auth', () => {
  it('Gets a message', (done) => {
    req
      .get('/api/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
