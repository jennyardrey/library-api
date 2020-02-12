const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
      if (err) {
        next(err);
      } else {
        this.password = hash;
        return next();
      }
    });
  }
});
userSchema.methods.sanitise = function() {
  const userObj = this.toObject();
  delete userObj.password;
  return userObj;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
