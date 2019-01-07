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
}

export default QuestionController;
