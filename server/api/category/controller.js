'use strict';

// Get list of users
exports.index = (req, res, next) => {
  User
    .find()
    .then((users) => res.status(200).send(users))
    .catch(e => next(e));
};
