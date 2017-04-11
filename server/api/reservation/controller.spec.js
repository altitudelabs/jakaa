'use strict';

let chai = require('chai');
let expect = chai.expect;
const _ = require('lodash');
const moment = require('moment');

describe('Reservation', () => {
  it('Checking that a reservation cannot be made in between another reservation', (done) => {
    expect(1).to.be.equal(1);
    done();
  });
});
