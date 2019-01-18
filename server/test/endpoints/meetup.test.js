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

  // Should return error for meetup not exist
  describe('GET/ Empty meetup', () => {
    // Nothing to return
    it('should return error no meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // Should get upcoming meetups
    it('should return error no upcoming meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Create a meetup
  describe('POST/ Create Meetup', () => {
    const meetup = {
      topic: 'Andela learning communinity meetup',
      description: 'description description description',
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

    // Should create a meetup
    it('Should return error meetup already created', async () => {
      const res = await chai.request(app).post('/api/v1/meetups').send(meetup);
      // .end((err, res) => {
      res.should.have.status(400);
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

    // Create meetup, Should return error - property is required
    it('Create meetup, should return error Meetup lenght to be at least 3 to 50', (done) => {
      meetup.topic = 'bl';
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
    it('Create meetup, should return error Meetup descriction and topic should string', (done) => {
      meetup.topic = 45;
      meetup.description = 34;
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
    it('Create meetup, should return error Meetup descriction should be at least 20 character long', (done) => {
      meetup.description = 'blai';
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
    it('Create meetup, should return error Meetup location is required', (done) => {
      meetup.location = '';
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
    it('Create meetup, should return error CreateBy should be a number', (done) => {
      meetup.created = "hjg";
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
    it('Create meetup, should return error tags duplicate', (done) => {
      meetup.tags = ['programming', 'programming'];
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
    it('Create meetup, should return error tag is empty', (done) => {
      meetup.tags = ['programming', ''];
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
          res.body.error.should.equal('Meetup with the given id is not exist');
          done();
        });
    });
  });
});
