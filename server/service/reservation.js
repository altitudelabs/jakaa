const _ = require('lodash');
const moment = require('moment');

const isAvailable = (allReservationsProps, newReservationProps) => {
  const newReservation = _.pick(newReservationProps, ['startTime', 'endTime']);
  const allReservations = _.map(allReservationsProps, (reservation) => {
    if (!moment(_.get(reservation, 'startTime', null)).isValid()) {
      console.log('throwing error');
      throw new Error(`Invalid start time for old reservation ${reservation}`);
    }
    if (!moment(_.get(reservation, 'endTime', null)).isValid()) {
      throw new Error(`Invalid end time for old reservation ${reservation}`);
    }
    return _.pick(reservation, ['startTime', 'endTime']);
  });
  if (!moment(_.get(newReservation, 'startTime', null)).isValid()) {
    throw new Error(`Invalid start time for new reservation ${newReservation}`);
  }
  if (!moment(_.get(newReservation, 'endTime', null)).isValid()) {
    throw new Error(`Invalid end time for new reservation ${newReservation}`);
  }
  _.forEach(allReservations, (reservation) => {
    console.log(newReservation.startTime);
    console.log(reservation.startTime, reservation.endTime);
    if (moment(newReservation.startTime).isBetween(reservation.startTime, reservation.endTime, null, '[]')) {
      throw new Error('Your reservation conflicts with another ' +
        `reservation made between ${reservation.startTime} and ${reservation.endTime}`);
    }
  });
  return Promise.resolve(newReservationProps);
};

module.exports = {
  isAvailable,
};
