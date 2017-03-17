'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let app = require('../../app');
chai.use(chaiHttp);
// test api
// https://github.com/chaijs/chai-http



describe('User', () => {
  it('Get user', (done) => {
    chai.request(app)
      .get('/api/user')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.instanceof(Array);
        done();
      });
  });
});
