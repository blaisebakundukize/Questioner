import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

// Test Question requests
describe('Question endpoints tests', () => {
  const question = {
    createdBy: 2,
    meetup: 2,
    title: 'title goes here',
    body: 'About Dart language for mobile and web apps, why would I learn a new language while I know Java, swift and javascript?'
  };

  describe('POST/ Questions', () => {
    // Should create a question
    it('Should create question if posted question is valid', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.equal(201);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // should return error if meetup id is undefined
    it('Should return error for undefined property', (done) => {
      question.meetup = undefined;
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });

    // should return error for shorter than 50 characters question
    it('Should return error if question is not atleast 50 characters long', (done) => {
      question.body = 'lest than 50 character long';
      chai.request(app)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  // Vote questions
  describe('PATCH/ Vote Questions', () => {
    const voter = {
      user: 2,
      question: 2
    };

    // Should upvote questions
    it('Should return question votes if user upvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/upvote')
        .send(voter)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal(200);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // Should update user vote type
    it('Should update user vote if user change his/her vote type', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/downvote')
        .send(voter)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal(200);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // Should downvote questions
    it('Should return question votes if user downvote a question', (done) => {
      voter.question = 4;
      chai.request(app)
        .patch('/api/v1/questions/downvote')
        .send(voter)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal(200);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });

    // Should return error of bad request question is require
    it('Should return error if the question given id is invalid', (done) => {
      voter.question = 'INVALID_QUESTION_ID';
      chai.request(app)
        .patch('/api/v1/questions/upvote')
        .send(voter)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});