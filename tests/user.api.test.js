/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
// reference to you app.js file
const req = request(app);

describe('/api/user - Get users without token', () => {
  it('Gets bad request', (done) => {
    req
      .post('/api/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});
