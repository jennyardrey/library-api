const app = require('../src/app');
const User = require('../src/models/users');
const UserHelpers = require('../tests/helpers/user-helpers');
const DataFactory = require('../tests/helpers/data-factory');

describe('/users', () => {
  describe('POST /users', () => {
    it('creates a new user in the database', done => {
      const data = DataFactory.user();
      UserHelpers.signUp(app, data).then(res => {
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveProperty('password');
        User.findById(res.body._id, (_, user) => {
          expect(user.firstName).toBe(data.firstName);
          expect(user.lastName).toBe(data.lastName);
          expect(user.password.length).toBe(60);
          expect(user.password).not.toBe(data.password);
          done();
        });
      });
      done();
    });
  });
  it('validates the password', done => {
    const data = DataFactory.user({ password: 'passwor' });
    UserHelpers.signUp(app, data).then(res => {
      expect(res.body.errors.password).toBe('Your password must be at least 8 characters long');
      done();
    });
  });
  it('validates the email', done => {
    const data = DataFactory.user({ email: 'jennardreycouk' });
    UserHelpers.signUp(app, data).then(res => {
      expect(res.body.errors.email).toBe('Invalid email address');
      done();
    });
  });
});
/* 
.then(
  User.countDocuments({}, count => {
    if (count > 0) {
      const docs = 'more than 0';
    } else {
      const docs = 0;
    }
    expect(docs).toBe(0);
  }),
        // console.log(docs);
      // 
) */
