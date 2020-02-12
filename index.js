const mongoose = require('mongoose');
const app = require('./src/app');

const APP_PORT = 3000;
const url = process.env.DATABASE_CONN;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  app.listen(APP_PORT, () => {
    console.log(`Now serving your Express app at http://localhost:${APP_PORT}`); // eslint-disable-line
  });
});
