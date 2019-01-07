import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();


describe('Questioner API Meetup Endpoints Tests', () => {
  // Test Invalid path
  describe('GET/ INVALID_PATH', () => {
    it('should return not found', (done) => {
      chai.request(app)
        .get('/INVALID_PATH')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal(404);
          res.body.should.have.property('error').equal('Resource Not Found');
          done();
        });
    });
  });

  // Test Meetups' requests
  describe('Meetups', () => {
    // Get all meetups
    describe('GET/ Meetups', () => {
      // Should get all meetups
      it('should return all meetups', (done) => {
        chai.request(app)
          .get('/api/v1/meetups')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal(200);
            res.body.data.should.be.an('array');
            done();
          });
      });

      // Should get upcoming meetups
      it('should return upcoming meetups', (done) => {
        chai.request(app)
          .get('/api/v1/meetups/upcoming')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal(200);
            res.body.data.should.be.an('array');
            res.body.data[0].should.be.an('object');
            done();
          });
      });
    });

    // Get a specific meetup
    describe('GET/ Specific meetup', () => {
      // Should get a specific meetup
      it('should return a specific meetup', (done) => {
        chai.request(app)
          .get('/api/v1/meetups/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal(200);
            res.body.data.should.be.an('object');
            done();
          });
      });

      // Should return error for an invalid id
      it('should return meetup not exist', (done) => {
        chai.request(app)
          .get('/api/v1/meetups/243MEETUP_NOT_EXIST')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.status.should.equal(404);
            res.body.error.should.equal('Requested meetup is not exist');
            done();
          });
      });
    });

    // Create a meetup
    describe('POST/ Create Meetup', () => {
      const meetup = {
        topic: 'Andela learning communinity meetup',
        description: 'description',
        location: 'location',
        images: ['image1', 'image2', 'image3'],
        happeningOn: '2019-03-29 10:00',
        tags: ['technology', 'programming'],
        createdBy: 1
      };

      // Should create a meetup
      it('Should return created meetup', async () => {
        const res = await chai.request(app).post('/api/v1/meetups').send(meetup);
        // .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal(201);
        res.body.data[0].should.be.an('object');
        // done();
      });


      // Create meetup, Should return error tag not found
      it('Create meetup, should return error undefined tag', (done) => {
        meetup.tags[0] = 'INVALID_TAG_NAME';
        chai.request(app)
          .post('/api/v1/meetups')
          .send(meetup)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.status.should.equal(400);
            res.body.should.have.property('error');
            done();
          });
      });

      // Create meetup, Should return error - property is required
      it('Create meetup, should return error property is required', (done) => {
        meetup.topic = undefined;
        chai.request(app)
          .post('/api/v1/meetups')
          .send(meetup)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.status.should.equal(400);
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });

  // Test meetups' RSVP
  describe('RSVP', () => {
    // Post Rsvp
    describe('POST/ Rsvp', () => {
      const rsvp = {
        user: 2,
        response: 'yes'
      };
      // should post rsvp
      it('should create a rsvp', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/3/rsvps')
          .send(rsvp)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.status.should.equal(201);
            res.body.data[0].status.should.equal('yes');
            done();
          });
      });

      // should update user rsvp of the same meetup
      it('should update previous user rsvp of the same meetup', (done) => {
        rsvp.response = 'no';
        chai.request(app)
          .post('/api/v1/meetups/3/rsvps')
          .send(rsvp)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.status.should.equal(201);
            res.body.data[0].status.should.equal('no');
            done();
          });
      });

      // should return error for undefined property
      it('should return error for undefined property', (done) => {
        rsvp.response = undefined;
        rsvp.user = 1;
        chai.request(app)
          .post('/api/v1/meetups/3/rsvps')
          .send(rsvp)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.status.should.equal(400);
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });
});
