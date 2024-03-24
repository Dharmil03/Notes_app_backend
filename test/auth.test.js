// test/signup.test.js

import { use, expect as _expect, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'; // Assuming your Express app is exported from app.js

// Configure chai
use(chaiHttp);
const expect = _expect;

describe('Signup Route', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/api/signup')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });

  it('should return an error if required fields are missing', (done) => {
    request(app)
      .post('/api/signup')
      .send({ username: 'testuser', password: 'password' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Username, email, and password are required');
        done();
      });
  });

});




