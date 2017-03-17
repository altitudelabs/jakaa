'use strict';

// Get list of reviews
exports.index = (req, res, next) => {
  PG.Review
    .find()
    .then((reviews) => res.status(200).send(reviews))
    .catch(e => next(e));
};

// Get a single review
exports.get = (req, res, next) => {

};

// Creates a new review in the DB.
exports.create = (req, res, next) => {
  req.checkBody('firstName', 'First Name is required.').notEmpty();
  req.checkBody('lastName', 'Last Name is required.').notEmpty();

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    throw new HttpError(422, validationErrors);
  }

  PG.Review.create(req.body)
    .then((review) => {
      res.send(review);
    })
    .catch(e => next(e));
};

// Updates an existing review in the DB.
exports.update = (req, res) => {
};

// Deletes a review from the DB.
exports.destroy = (req, res) => {
};
