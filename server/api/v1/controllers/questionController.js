import Question from '../../../models/question';

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
  static async createQuestion(req, res) {
    if (req.body.body.length < 50) {
      return res.status(400).send({
        status: 400,
        error: 'Question must be atleast 50 characters long'
      });
    }
    try {
      const question = await Question.addQuestion(req.body);
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
  static async voteQuestion(req, res) {
    const IsVoteType = req.path.toLowerCase().split('/').find(p => p === 'upvote');
    const voteType = IsVoteType === undefined ? 'down' : 'up';
    const data = req.body;
    data.voteType = voteType;
    try {
      const question = await Question.getById(data.question);
      const voter = await Question.getUserVote(data.user, data.question);
      let votes;
      if (voter !== undefined) {
        votes = await Question.updateUserVote(voter, voteType);
      } else {
        votes = await Question.voteQuestion(data);
      }
      return res.status(200).send({
        status: 200,
        data: [{
          meetup: question.meetup,
          title: question.title,
          body: question.body,
          votes
        }]
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: err.message
      });
    }
  }
}

export default QuestionController;
