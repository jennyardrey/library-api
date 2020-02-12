const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/users');

describe('/users', () => {
  beforeAll(done => {
    const url = process.env.DATABASE_CONN;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  afterEach(done => {
    User.deleteMany({}, () => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  describe('POST /users', () => {
    it('creates a new user in the database', done => {
      request(app)
        .post('/users')
        .send({
          firstName: 'Jenny',
          lastName: 'Ardrey',
          email: 'jenny@ardrey.co.uk',
          password: '12345',
        })
        .then(res => {
          expect(res.status).toBe(200);
          User.findById(res.body._id, (_, user) => {
            expect(user.firstName).toBe('Jenny');
            expect(user.lastName).toBe('Ardrey');
            expect(user.password.length).toBe(60);
            expect(user.password).not.toBe('12345');
            done();
          });
        });
      // done ();
    });
  });
});
