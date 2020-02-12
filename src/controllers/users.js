const User = require('../models/users');

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then(() => {
    res.status(200).json(user);
  });
};
