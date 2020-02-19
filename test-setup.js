const mongoose = require('mongoose');
const User = require('./src/models/users');

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
