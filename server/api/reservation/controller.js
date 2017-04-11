'use strict';
const _ = require('lodash');
const moment = require('moment');
const validator = require('validator');
const reservationService = require('../../service/reservation')

const validReservationProps = ['startTime', 'endTime', 'paymentToken', 'itemId'];

exports.getRequestDetails = (req, res, next) => {
  PG.Request
  .findOne({
    where: { id: req.params.id },
    include: [{
      model: PG.Item,
      as: 'item',
    }],
  }).then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
};

exports.makeReservation = (req, res, next) => {
  const pickedProps = _.pick(req.body, validReservationProps);
  return PG.Reservation.findAll({
    where: { itemId: pickedProps.itemId },
  })
  .then((reservations) => {
    return reservationService.isAvailable(reservations, pickedProps);
  })
  .then((validReservation) => {
    return PG.Reservation.create(validReservation);
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
};
