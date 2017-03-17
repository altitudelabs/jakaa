'use strict';

// Get list of users
exports.index = (req, res, next) => {
  User
    .find()
    .then((users) => res.status(200).send(users))
    .catch(e => next(e));
};

// Get a single user
exports.get = (req, res, next) => {

};

// Creates a new user in the DB.
exports.create = (req, res, next) => {
  req.checkBody('firstName', 'First Name is required.').notEmpty();
  req.checkBody('lastName', 'Last Name is required.').notEmpty();

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    throw new HttpError(422, validationErrors);
  }

  PG.User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch(e => next(e));
};

// Updates an existing user in the DB.
exports.update = (req, res) => {
};

// Deletes a user from the DB.
exports.destroy = (req, res) => {
};
