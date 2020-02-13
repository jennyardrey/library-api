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
          resolve(res);
        }
      });
  });
