'use strict';

// Get list of users
exports.index = (req, res, next) => {
  PG.Wishlist
    .findAll()
    .then((wishlist) => res.status(200).send(wishlist))
    .catch(e => next(e));
};
