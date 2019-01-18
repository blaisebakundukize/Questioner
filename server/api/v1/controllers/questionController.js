import Question from '../../../models/question';
import { validateQuestion } from '../../../utils/validateData';
import Meetup from '../../../models/meetup';

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
    try {
      // eslint-disable-next-line no-unused-vars
      const isQuestionStored = await Question.getQuestionByItsProperties(data);
      // eslint-disable-next-line no-unused-vars
      const isValidated = await validateQuestion(data);
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
    const data = req.body;
    data.voteType = voteType;
    data.meetup = parseInt(req.params.meetupId, 10);
    data.question = parseInt(req.params.questionId, 10);
    console.log(data.meetup);
    try {
      let meetup;
      let questionAvailable;
      try {
        meetup = await Meetup.getById(data.meetup);
        questionAvailable = await Question.getById(data.question, data.meetup);
      } catch (error) {
        return res.status(404).send({
          status: 404,
          error: error.message
        });
      }
      const votes = await Question.saveVotes(data);
      return res.status(200).send({
        status: 200,
        data: [{
          meetup: meetup.id,
          title: questionAvailable.title,
          body: questionAvailable.body,
          downvotes: votes.downvotes,
          upvotes: votes.upvotes
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
