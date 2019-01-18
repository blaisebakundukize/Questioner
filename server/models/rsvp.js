import userDataSchema from '../utils/useDataSchemas';
import nextId from '../utils/nextId';
/**
 * This model represents meetup's rsvp
 * @class
 * @exports
 */
class RSVP {
  /**
   * @constructor
   */
  constructor() {
    this.rsvps = [];
    this.rsvpSchema = {
      id: undefined,
      meetup: undefined,
      user: undefined,
      response: undefined,
      createdOn: new Date(),
      updatedOn: new Date()
    };
  }

  /**
   * Get user rsvp reply of a meetup
   * @param {Number} user - User id
   * @param {Number} meetup - meetup id
   * @return {Object} RSVP replied by a user
   */
  getUserReplyToAttend(user, meetup) {
    const rsvp = this.rsvps.find(r => r.user === user && r.meetup === meetup);

    return rsvp === undefined;
  }

  /**
   * Update user rsvp reply of a meetup
   * @param {Object} data - Object of user, meetup and response
   * @return {Object} User Update rsvp reply
   */
  updateUserReplyToAttend(data) {
    const index = this.rsvps.findIndex(rsvp => rsvp.user === data.user && rsvp.meetup === data.meetup);

    if (this.rsvps[index].response.toLowerCase() !== data.response.toLowerCase()) {
      this.rsvps[index].response = data.response;
    }

    return this.rsvps[index];
  }

  /**
   * Reply to attend a meetup
   * @param {Object} data - An Object of user, meetup and rsvp status
   * @return {Object} rsvp - Data format for rsvp
   */
  async replyToAttend(data) {
    const nId = nextId(this.rsvps);
    return new Promise((resolve, reject) => {
      try {
        const rsvp = userDataSchema(data, nId, this.rsvpSchema);
        // Save user rsvp to database
        this.rsvps.push(rsvp);
        resolve(rsvp);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new RSVP();
