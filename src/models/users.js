const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const isEmail = require('isemail');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  password: {
    type: String,
    minlength: 8,
  },
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
