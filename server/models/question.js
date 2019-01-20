// import questions, { questionSchema } from '../database/questions';
// import voters, { voterSchema } from '../database/voters';
import nextId from '../utils/nextId';
import useDataSchemas from '../utils/useDataSchemas';

/**
 * Class represents meetup's questions
 * @exports
 * @class
 */
class Question {
  /**
   * @constructor
   */
  constructor() {
    this.questions = [];
    this.questionSchema = {
      id: undefined,
      createdOn: new Date(),
      createdBy: undefined,
      meetup: undefined,
      title: null,
      body: undefined,
      votes: null,
      updatedOn: new Date()
    };
    this.upvoters = [];
    this.downvoters = [];
  }

  /**
   * Add meetup's question to a database
   * @param {Object} data - An object of question fields
   * @return {Object} Created question
   */
  async addQuestion(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = nextId(this.questions);
        const question = await useDataSchemas(data, id, this.questionSchema);
        question.votes = 0;
        this.questions.push(question);
        resolve(question);
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
    return new Promise((resolve, reject) => {
      const questionFound = this.questions.find(q => (q.title === question.title) && (q.meetup === question.meetup) && (q.body === question.body));
      if (questionFound === undefined) {
        resolve(true);
      } else {
        reject(new Error('Question is already asked'));
      }
    });
  }

  /**
   * Get a specif question
   * @param {Number} id - Question identifier
   * @param {Number} meetupId - Meetup identifier with the Question
   * @return {Object} Question
   */
  getById(id, meetupId) {
    const question = this.questions.find(q => (q.id === id) && (q.meetup === meetupId));
    return new Promise((resolve, reject) => {
      if (question === undefined) reject(new Error('The question with the given ID is not found'));
      resolve(question);
    });
  }

  /**
   * Get user votes
   * @param {Number} userId - user identifier
   * @param {Number} questionId - question identifier
   * @return {Object} User vote
   */
  getUserVote(userId, questionId) {
    let voter;
    voter = this.downvoters.find(d => d.user === userId && d.question === questionId);
    if (voter === undefined) {
      voter = this.upvoters.find(u => u.user === userId && u.question === questionId);
      if (voter !== undefined) {
        voter.voteType = 'upvote';
      }
    }
    return voter;
  }

  /**
   * Upvote questions
   * @param {Object} voter - User vote data
   */
  vote(voter) {
    const alreadyVote = this.getUserVote(voter.user, voter.question);
    return new Promise((resolve, reject) => {
      let votePoints;
      if (alreadyVote === undefined) {
        if (voter.voteType === 'upvote') {
          votePoints = 1;
        } else {
          votePoints = -1;
        }
      } else if (alreadyVote.voteType) {
        if (voter.voteType === 'upvote') {
          reject(new Error('You have already upvoted'));
        } else {
          const userVotesIndex = this.upvoters.findIndex(v => v.user === voter.user && v.meetup === voter.meetup);
          this.upvoters.splice(userVotesIndex, 1);
          votePoints = -2;
        }
      } else if (voter.voteType === 'downvote') {
        reject(new Error('You have already downvoted'));
      } else {
        const userVotesIndex = this.downvoters.findIndex(v => v.user === voter.user && v.meetup === voter.meetup);
        this.downvoters.splice(userVotesIndex, 1);
        votePoints = 2;
      }
      resolve({ ...voter, votePoints });
    });
  }

  /**
     * Increase question votes
     * @param {Object} voter - User vote data
     */
  async saveVotes(voter) {
    return new Promise(async (resolve, reject) => {
      try {
        const votes = await this.vote(voter);
        let nId;
        if (votes.voteType === 'upvote') {
          nId = nextId(this.upvoters);
          this.upvoters.push({ id: nId, user: votes.user, question: votes.question });
        } else {
          nId = nextId(this.downvoters);
          this.downvoters.push({ id: nId, user: votes.user, question: votes.question });
        }
        const questionIndex = this.questions.findIndex(q => q.id === votes.question);
        this.questions[questionIndex].votes += votes.votePoints;
        const upvotes = this.upvoters.filter(up => up.question === votes.question);
        const downvotes = this.downvoters.filter(dw => dw.question === votes.question);
        resolve({ upvotes: upvotes.length, downvotes: downvotes.length });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Question();
