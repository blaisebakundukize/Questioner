import rsvps, { rsvpSchema } from '../database/rsvps';

/**
 * This model represents meetup
 * @class
 * @exports
 */
class RSVP {
  /**
   * Get user rsvp reply of a meetup
   * @param {Number} user - User id
   * @param {Number} meetup - meetup id
   * @return {Object} RSVP replied by a user
   */
  static getUserReplyToAttend(user, meetup) {
    const rsvp = rsvps.find(r => r.user === user && r.meetup === meetup);

    return rsvp === undefined;
  }

  /**
   * Update user rsvp reply of a meetup
   * @param {Object} data - Object of user, meetup and response
   * @return {Object} User Update rsvp reply
   */
  static updateUserReplyToAttend(data) {
    const index = rsvps.findIndex(rsvp => rsvp.user === data.user && rsvp.meetup === data.meetup);

    if (rsvps[index].response.toLowerCase() !== data.response.toLowerCase()) {
      rsvps[index].response = data.response;
    }

    return rsvps[index];
  }

  /**
   * Reply to attend a meetup
   * @param {Object} data - An Object of user, meetup and rsvp status
   * @return {Object} rsvp - Data format for rsvp
   */
  static replyToAttend(data) {
    const rsvpKeys = Object.keys(rsvpSchema);
    const rsvp = Object.assign({}, rsvpSchema);
    const nextId = rsvps[rsvps.length - 1
    ].id + 1;
    rsvp.id = nextId;

    rsvpKeys.forEach((key) => {
      if (data[key]) {
        rsvp[key] = data[key];
      }
      // check if rsvp properties contains valid data
      if (rsvp[key] === undefined) {
        throw new Error(`${key} is required`);
      }
    });
    // Save user rsvp to database
    rsvps.push(rsvp);

    return rsvp;
  }
}

export default RSVP;
