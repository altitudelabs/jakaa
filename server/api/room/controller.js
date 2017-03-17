'use strict';

// Get list of rooms
exports.index = (req, res, next) => {
  PG.Room
    .findAll()
    .then((rooms) => res.status(200).send(rooms))
    .catch(e => next(e));
};

// Get a single room
exports.get = (req, res, next) => {

};

// Creates a new user in the DB.
exports.create = (req, res, next) => {
  // req.checkBody('firstName', 'First Name is required.').notEmpty();
  // req.checkBody('lastName', 'Last Name is required.').notEmpty();

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    throw new HttpError(422, validationErrors);
  }

  PG.Room.create(req.body)
    .then((room) => {
      res.send(room);
    })
    .catch(e => next(e));
};

// Updates an existing user in the DB.
exports.update = (req, res) => {
};

// Deletes a user from the DB.
exports.destroy = (req, res) => {
};
