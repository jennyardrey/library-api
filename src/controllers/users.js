const jwt = require('jsonwebtoken');
const User = require('../models/users');
/* eslint no-underscore-dangle: 0 */

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.status(200).json(user.sanitise());
    })
    .catch(error => {
      if (error.name === 'ValidationError') {
        const emailError = error.errors.email ? error.errors.email.message : null;
        const passwordError = error.errors.password
          ? 'Your password must be at least 8 characters long'
          : null;
        res.status(400).json({
          errors: {
            email: emailError,
            password: passwordError,
          },
        });
      } else {
        res.sendStatus(500);
      }
    });
};

exports.login = (req, res) => {
  // console.log(req.body.email);
  User.findOne({ email: req.body.email }).then(user => {
    if (!user === null) {
      const payload = {
        name: user.name,
        id: user._id,
      };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' }, () => {});
    } else {
      res.sendStatus(404);
    }
  });
};
