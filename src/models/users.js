const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.pre('save', function encryptPassword(next) {
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      next(err);
    } else {
      this.password = hash;
      return next();
    }
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
