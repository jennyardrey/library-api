const jwt = require('jsonwebtoken');
const token = require('jsonwebtoken');
/* eslint no-underscore-dangle: 0 */

const app = require('../src/app');
const UserHelpers = require('../tests/helpers/user-helpers');
const DataFactory = require('../tests/helpers/data-factory');

describe('/auth', () => {
  describe('POST /auth/login', () => {
    it('users can sign up to our system', done => {
      const data = DataFactory.user();
      const user = UserHelpers.signUp(app, data);
      // console.log(data);
      UserHelpers.login(app, user).then(res => {
        expect(res.status).toBe(200);
        const decoded = jwt.decode(token, { complete: true });
        expect(decoded.payload._id).toBeTruthy();
        expect(decoded.payload.firstName).toBeTruthy();
        expect(decoded.payload.lastName).toBeTruthy();
      });
      done();
    });
  });
});
