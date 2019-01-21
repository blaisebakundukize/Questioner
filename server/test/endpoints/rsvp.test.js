import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import rsvp from '../../models/rsvp';

chai.use(chaiHttp);
chai.should();

describe('Questioner endpoints Meetup RSVPs', () => {
  describe('PATCH/ Meetup RSVP', () => {
    const rspv = {
      user: 5,
      response: 'yes'
    };

    // RSVP should be created
    it('Should return meetup user sent RSVP', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.equal(201);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // Should return error same user, response, rsvp and meetup
    it('Should return error user has sent the same RSVP on the meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });

    // Should change user RSVP
    it('Should change user RSVP if response is changed to no', (done) => {
      rspv.response = 'no';
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.equal(201);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // Should change user RSVP
    it('Should change user RSVP if response is changed to maybe', (done) => {
      rspv.response = 'maybe';
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.equal(201);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // Create RSVP for a Meetup return error user id not valid
    it('Should return error user id not valid and response not valid for RSVP', (done) => {
      rspv.user = 'INVALID_ID';
      // rsvp.response = 'INVALID';
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });

    // Create RSVP for a Meetup return error user id not valid
    it('Should return error response not valid for RSVP', (done) => {
      rsvp.response = 'INVALID_RESPONSE';
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });

    // Should return error meetup not exist for RSVP
    it('Should return meetup does not exist for RSVP', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/INVALID_MEETUP_ID/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });

    // Should return error if one property is undefined
    it('Should return RSVP property required', (done) => {
      rspv.createdOn = undefined;
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps/')
        .send(rspv)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
