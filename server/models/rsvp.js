import db from '../database/index';

/**
 * This model represents meetup's rsvp
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
  getUserReplyToAttend(data) {
    const getUserRsvp = 'SELECT * FROM rsvps WHERE meetup = $1 AND "user" = $2';
    return new Promise(async (resolve, reject) => {
      try {
        const values = [data.meetup, data.user];
        const { rows } = await db.query(getUserRsvp, values);
        let isResponseNew = false;
        if (!rows[0]) {
          isResponseNew = true;
        } else if (rows[0].response.toLowerCase() === data.response.toLowerCase()) {
          reject(new Error(`Your response was '${data.response}' too!`));
        }
        resolve(isResponseNew);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update user rsvp reply of a meetup
   * @param {Object} data - Object of user, meetup and response
   * @return {Object} User Update rsvp reply
   */
  updateUserReplyToAttend(data) {
    const queryUpdateRsvp = 'UPDATE rsvps SET response = $1 WHERE "user" = $2 AND meetup = $3 returning *';
    const values = [data.response, data.user, data.meetup];

    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryUpdateRsvp, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Reply to attend a meetup
   * @param {Object} data - An Object of user, meetup and rsvp status
   * @return {Object} rsvp - Data format for rsvp
   */
  replyToAttend(data) {
    const queryReplyToAttend = 'INSERT INTO rsvps(meetup, "user", response) VALUES ($1, $2, $3)returning *';

    const values = [data.meetup, data.user, data.response];

    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryReplyToAttend, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new RSVP();
