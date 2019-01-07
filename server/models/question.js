import questions, { questionSchema } from '../database/questions';
import voters, { voterSchema } from '../database/voters';

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

  /**
   * Get a specif question
   * @param {Number} id - Question identifier
   * @return {Object} Question
   */
  static getById(id) {
    const question = questions.find(q => q.id === id);
    return new Promise((resolve, reject) => {
      if (question === undefined) reject(new Error('The question with the given ID is invalid'));
      resolve(question);
    });
  }

  /**
   * Get user votes
   * @param {Number} userId - user identifier
   * @param {Number} questionId - question identifier
   * @return {Object} User vote
   */
  static getUserVote(userId, questionId) {
    const voter = voters.find(v => v.user === userId && v.question === questionId);
    return Promise.resolve(voter);
  }

  /**
   * Update user vote
   * @param {Object} vote - User vote data
   * @param {String} voteType - up or down
   */
  static updateUserVote(voter, voteType) {
    const voteIndex = voters.findIndex(v => v.id === voter.id);
    const questionIndex = questions.findIndex(q => q.id === voter.question);
    return new Promise((resolve) => {
      if (voter.voteType !== voteType) {
        voters[voteIndex] = voteType;
        console.log(voteType);
        if (voteType === 'up') {
          questions[questionIndex].votes += 2;
        } else {
          questions[questionIndex].votes -= 2;
        }
      }
      resolve(questions[questionIndex].votes);
    });
  }

  /**
   * Upvote question
   * @param {Object} data - Contains type of vote and ids for question, user, and meetup
   * @return {Object} User data saved for voting
   */
  static voteQuestion(data) {
    const questionIndex = questions.findIndex(q => q.id === data.question);
    const nextVotersId = voters[voters.length - 1].id + 1;
    const voter = { ...voterSchema };
    voter.id = nextVotersId;
    voter.user = data.user;
    voter.question = data.question;
    voter.voteType = data.voteType;
    return new Promise((resolve) => {
      voters.push(voter);
      if (data.voteType === 'up') {
        questions[questionIndex].votes += 1;
      } else {
        questions[questionIndex].votes -= 1;
      }
      resolve(questions[questionIndex].votes);
    });
  }
}

export default Question;
