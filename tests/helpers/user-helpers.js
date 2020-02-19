const request = require('supertest');

exports.signUp = (app, data) =>
  new Promise((resolve, reject) => {
    request(app)
      .post('/users')
      .send(data)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          // console.log(res);

          resolve(res);
        }
      });
  });
exports.login = (app, data) => {
  // eslint-disable-next-line no-new
  return new Promise((resolve, reject) => {
    request(app)
      .post('/auth/login')
      .send({
        email: data.email,
        password: data.password,
      })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
};
