'use strict';

let chai = require('chai');
let expect = chai.expect;
let reservationService = require('./reservation');

const validPastReservations = [{
  startTime: '2017-04-11T10:40:20.815Z',
  endTime: '2017-04-15T10:40:20.815Z',
}, {
  startTime: '2017-04-16T10:40:20.815Z',
  endTime: '2017-04-20T10:40:20.815Z',
}];

const sampleItemProps = {
  id: 1,
  title: 'Nikon D500',
  brand: 'Nikon',
  model: 'd500',
  condition: 'new',
  description: 'Something',
  purchaseDate: '2017-04-10T07:31:51.597Z',
  photos: [
    'http://kenrockwell.com/nikon/images1/d500/1600.jpg',
  ],
  minRentingPeriod: 10,
  maxRentingPeriod: 15,
  availability: [[
    '2017-04-10T07:31:51.597Z',
    '2017-04-30T07:31:51.597Z',
  ]],
  price: 50,
  deposit: 100,
  length: 100,
  height: 100,
  width: 100,
  ownerId: 2,
};

describe('Reservation Service', () => {
  it('Given a valid set of prior reservations and a valid new reservation,' +
  ' the reservation service will validate it successfully', (done) => {
    const newReservation = {
      startTime: '2017-04-21T10:40:20.815Z',
      endTime: '2017-04-25T10:40:20.815Z',
    };
    reservationService.isAvailable(validPastReservations, newReservation)
    .then((validReservation) => {
      expect(validReservation.startTime).to.equal(newReservation.startTime);
      expect(validReservation.endTime).to.equal(newReservation.endTime);
      done();
    });
  });

  it('Given a valid set of prior reservations and a new reservation' +
  ' where end date < start date, it fails to be validated', (done) => {
    const newReservation = {
      startTime: '2017-04-10T10:40:20.815Z',
      endTime: '2017-04-01T10:40:20.815Z',
    };
    reservationService.isAvailable(validPastReservations, newReservation)
    .catch((err) => {
      expect(err.message).to.contain('End date');
      done();
    });
  });

  it('Given an invalid set of prior reservations (malformed object) and a valid new reservation' +
  ' it fails to be validated', (done) => {
    const invalidPastReservations = [{
      what: 'are you reading this for?',
      cos: 'this is supposed to be invalid',
    }, {
      really: 'you\'re wasting even more time just like',
      endTime: '2017-04-01T10:40:20.815Z',
    }];
    const newReservation = {
      startTime: '2017-04-10T10:40:20.815Z',
      endTime: '2017-04-01T10:40:20.815Z',
    };
    reservationService.isAvailable(invalidPastReservations, newReservation)
    .catch((err) => {
      expect(err.message).to.contain('Invalid');
      done();
    });
  });

  it('Given a valid set of prior reservations and an invalid new reservation' +
  ' (malformed object) it fails to be validated', (done) => {
    const newReservation = {
      what: 'are you reading this for?',
      cos: 'this is supposed to be invalid',
    };
    reservationService.isAvailable(validPastReservations, newReservation)
    .catch((err) => {
      expect(err.message).to.contain('Invalid');
      done();
    });
  });

  it ('Given a valid set of prior reservations, invalid new reservation ' +
  '(duration shorter than item\'s minimum renting period) and an item\'s details, ' +
  ' it fails to be validated', (done) => {
    const newReservation = {
      startTime: '2017-04-10T10:40:20.815Z',
      endTime: '2017-04-15T10:40:20.815Z',
    };
    reservationService.isAvailable(validPastReservations, newReservation, sampleItemProps)
    .then((result) => {
      done();
    })
    .catch((err) => {
      expect(err.message).to.contain('shorter than the minimum renting period');
      done();
    });
  });

  it ('Given a valid set of prior reservations, invalid new reservation ' +
  '(duration longer than item\'s minimum renting period) and an item\'s details, ' +
  ' it fails to be validated', (done) => {
    const newReservation = {
      startTime: '2017-04-01T10:40:20.815Z',
      endTime: '2017-04-30T10:40:20.815Z',
    };
    reservationService.isAvailable(validPastReservations, newReservation, sampleItemProps)
    .then((result) => {
      console.log(result);
      done();
    })
    .catch((err) => {
      expect(err.message).to.contain('longer than the maximum renting period');
      done();
    });
  });
});
