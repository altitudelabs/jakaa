'use strict';

// Get list of users
exports.index = (req, res, next) => {
  PG.Category
    .findAll()
    .then((categories) => res.status(200).send(categories))
    .catch(e => next(e));
};
