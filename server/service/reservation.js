const _ = require('lodash');
const moment = require('moment');

const isAvailable = (allReservationsProps, newReservationProps, item = {}) => {
  return new Promise((resolve, reject) => {
    const newReservation = _.pick(newReservationProps, ['startTime', 'endTime']);
    const allReservations = _.map(allReservationsProps, (reservation) => {
      if (!moment(_.get(reservation, 'startTime', null)).isValid()) {
        reject(new Error(`Invalid start time for old reservation ${JSON.stringify(reservation)}`));
      }
      if (!moment(_.get(reservation, 'endTime', null)).isValid()) {
        reject(new Error(`Invalid end time for old reservation ${JSON.stringify(reservation)}`));
      }
      return _.pick(reservation, ['startTime', 'endTime']);
    });
    const newStartTime = _.get(newReservation, 'startTime', null);
    const newEndTime = _.get(newReservation, 'endTime', null);
    if (!moment(newStartTime).isValid()) {
      reject(new Error(`Invalid start time for new reservation ${JSON.stringify(newReservation)}`));
    }
    if (!moment(newEndTime).isValid()) {
      reject(new Error(`Invalid end time for new reservation ${JSON.stringify(newReservation)}`));
    }
    if (moment(newEndTime).isSameOrBefore(newStartTime, 'day')) {
      reject(new Error(`End date (${newEndTime}) is either on or before the Start date ${newStartTime}`));
    }
    _.forEach(allReservations, (reservation) => {
      if (moment(newReservation.startTime).isBetween(reservation.startTime, reservation.endTime, null, '[]')) {
        reject(new Error('Your reservation conflicts with another ' +
          `reservation made between ${reservation.startTime} and ${reservation.endTime}`));
      }
    });
    const diff = moment(newEndTime).diff(moment(newStartTime), 'days');
    if (_.get(item, 'minRentingPeriod', null) != null) {
      if (diff < parseInt(item.minRentingPeriod, 10)) {
        reject(new Error(`The duration of your reservation (${diff} days) is shorter than the minimum ` +
        `renting period (${item.minRentingPeriod} days) required to rent this item`));
      }
    }
    if (_.get(item, 'maxRentingPeriod', null) != null) {
      if (diff > parseInt(item.maxRentingPeriod, 10)) {
        reject(new Error(`The duration of your reservation (${diff} days) is longer than the maximum ` +
        `renting period (${item.minRentingPeriod} days) that is allowed to rent this item`));
      }
    }
    resolve(newReservationProps);
  });
};

module.exports = {
  isAvailable,
};
