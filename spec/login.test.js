const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');
const { tokenSecretKey } = require('../configs/index');
const { describe, it, after } = require('mocha');

const mockUser = {
  email: 'user-email@gmail.com',
  name: 'user-name',
  photoUrl: 'user-photo-url',
};

describe('POST `/login`', function () {
  this.timeout(10000);
  const removeMockUser = async () => {
    await User.deleteOne({ name: mockUser.name });
  };

  after(removeMockUser);

  it('should add new user if non non-joined user request login, and should response with token and userInfo', (done) => {
    request(app)
      .post('/login')
      .type('json')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        const { result, data } = res.body;
        const newUser = await User.findOne({ name: mockUser.name });
        expect(result).to.eql('ok');
        expect(newUser.name).to.eql(data.user.name);
        done();
      });
  });

  it('should response with token and userInfo If joined user request login', (done) => {
    request(app)
      .post('/login')
      .type('json')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        const { result, data } = res.body;
        const payload = await jwt.verify(data.token, tokenSecretKey);
        expect(result).to.eql('ok');
        expect(data.user.name).to.eql(payload.name);
        expect(data.user.email).to.eql(payload.email);
        expect(data.user.photoUrl).to.eql(payload.photoUrl);
        done();
      });
  });
});
