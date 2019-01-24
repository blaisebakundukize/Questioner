import Question from '../models/question';
import { validateQuestion } from '../utils/validateData';
import Meetup from '../models/meetup';

/**
 * Controller of Question model
 * @exports
 * @class
 */
class QuestionController {
  /**
   * Create question
   * @param {Object} req - Request made by user
   * @param {Object} res - Response
   * @return {Object} Response
   */
  async createQuestion(req, res) {
    const data = req.body;
    data.meetup = parseInt(req.params.meetupId, 10);
    data.createdBy = req.user.userId;
    try {
      // eslint-disable-next-line no-unused-vars
      const isMeetupAvailable = await Meetup.getById(data.meetup);
      const error = await validateQuestion(data);
      if (error.length > 0) {
        return res.status(400).send({
          status: 400,
          error
        });
      }
      // eslint-disable-next-line no-unused-vars
      const isQuestionStored = await Question.getQuestionByItsProperties(data);
      const question = await Question.addQuestion(data);
      return res.status(201).send({
        status: 201,
        data: [{
          user: question.createdBy,
          meetup: question.meetup,
          title: question.title,
          body: question.body
        }]
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: err.message
      });
    }
  }

  /**
   * Vote questions
   * @param {Object} req - Request made by the user
   * @param {Object} res - Response to the user
   * @return {Object} Response
   */
  async voteQuestion(req, res) {
    const IsVoteType = req.path.toLowerCase().split('/').find(p => p === 'upvote');
    const voteType = IsVoteType === undefined ? 'downvote' : 'upvote';
    const data = {};
    data.voteType = voteType;
    data.question = parseInt(req.params.questionId, 10);
    data.user = req.user.userId;
    try {
      let questionAvailable;
      try {
        questionAvailable = await Question.getById(data.question);
      } catch (error) {
        return res.status(404).send({
          status: 404,
          error: error.message
        });
      }
      // eslint-disable-next-line no-unused-vars
      const votes = await Question.saveVotes(data);
      const downvotes = await Question.countDownvotes(data.question);
      const upvotes = await Question.countUpvotes(data.question);
      return res.status(200).send({
        status: 200,
        data: [{
          meetup: questionAvailable.meetup,
          title: questionAvailable.title,
          body: questionAvailable.body,
          downvotes,
          upvotes
        }]
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.message
      });
    }
  }
}

export default new QuestionController();
