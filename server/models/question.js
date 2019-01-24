import db from '../database/index';

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
  async addQuestion(data) {
    const queryAddQuestion = 'INSERT INTO questions(created_by, meetup, title, body) VALUES ($1, $2, $3, $4)returning *';
    const values = [data.createdBy, data.meetup, data.title, data.body];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryAddQuestion, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Checkout if it is allready stored
   * @param {Object} question - question to create
   */
  getQuestionByItsProperties(question) {
    const queryGetQuery = 'SELECT * FROM questions WHERE title = $1 AND meetup = $2 AND body = $3';

    const values = [question.title, question.meetup, question.body];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetQuery, values);
        if (!rows[0]) {
          resolve(true);
        } else {
          reject(new Error('Question is already asked'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get a specif question
   * @param {Number} id - Question identifier
   * @return {Object} Question
   */
  getById(id) {
    const queryGetQuestion = 'SELECT * FROM questions WHERE question_id = $1';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetQuestion, [id]);
        if (!rows[0]) reject(new Error('The question with the given ID does not found'));
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get user votes
   * @param {Number} userId - user identifier
   * @param {Number} questionId - question identifier
   * @return {Object} User vote
   */
  getUserVote(userId, questionId) {
    const queryGetUserVote = 'SELECT * FROM voters WHERE "user" = $1 AND question = $2';

    const values = [userId, questionId];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetUserVote, values);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Count question downvotes
   * @param {Number} questionId - Question id
   */
  countDownvotes(questionId) {
    const queryCountDowvotes = 'SELECT COUNT(vote_type) As downvotes FROM voters WHERE vote_type = $1 AND question = $2';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryCountDowvotes, ['downvote', questionId]);
        resolve(parseInt(rows[0].downvotes, 10));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Count question upvotes
   * @param {Number} questionId - Question id
   */
  countUpvotes(questionId) {
    const queryCountUpvotes = 'SELECT COUNT(vote_type) AS upvotes FROM voters WHERE vote_type = $1 AND question = $2';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryCountUpvotes, ['upvote', questionId]);
        resolve(parseInt(rows[0].upvotes, 10));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
     * Increase question votes
     * @param {Object} voter - User vote data
     */
  async saveVotes(voter) {
    return new Promise(async (resolve, reject) => {
      try {
        const votes = await this.getUserVote(voter.user, voter.question);
        if (!votes[0]) {
          const querySaveVote = 'INSERT INTO voters("user", question, vote_type) VALUES ($1, $2, $3)returning *';
          const values = [voter.user, voter.question, voter.voteType];

          const { rows } = await db.query(querySaveVote, values);
          resolve(rows[0]);
        } else if (votes[0].vote_type === voter.voteType) {
          reject(new Error(`You have already ${voter.voteType}d the question`));
        } else {
          const queryUpdateVote = 'UPDATE voters SET vote_type = $1 WHERE "user" = $2 AND question = $3 returning *';
          const values = [voter.voteType, voter.user, voter.question];
          const { rows } = await db.query(queryUpdateVote, values);
          resolve(rows[0]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Question();
