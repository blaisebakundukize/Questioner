import questions, { questionSchema } from '../database/questions';

/**
 * Class represents meetup's questions
 * @exports
 * @class
 */
class Question {
  /**
   * Add meetup's question to a database
   * @param {Object} data - An object of question fields
   * @return {Object} Created question
   */
  static addQuestion(data) {
    return new Promise((resolve, reject) => {
      const questionFields = Object.keys(questionSchema);
      const question = { ...questionSchema };
      const nextId = questions[questions.length - 1].id + 1;
      question.id = nextId;
      question.createdOn = Date.now();
      question.votes = 0;
      questionFields.forEach((field) => {
        if (data[field]) {
          question[field] = data[field];
        }

        if (question[field] === undefined) {
          reject(new Error(`${field} is required`));
        }
      });
      questions.push(question);
      resolve(question);
    });
  }
}

export default Question;
