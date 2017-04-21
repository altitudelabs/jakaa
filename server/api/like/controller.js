'use strict';

// Get list of users
exports.index = (req, res, next) => {
  PG.Like
    .findAll()
    .then((likes) => res.status(200).send(likes))
    .catch(e => next(e));
};
