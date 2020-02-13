const User = require('../models/users');

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
