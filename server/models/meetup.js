import meetups, { meetupSchema } from '../database/meetups';

/**
 * This model represents meetup
 * @class
 * @exports
 */
class Meetup {
  /**
   * Get all meetups
   * @returns {Array} An array of all meetups
   */
  static getAll() {
    return meetups;
  }

  /**
   * Get upcoming meetups
   * @returns {Array} An array of upcoming meetups
   */
  static getUpcoming() {
    const upcomings = meetups.filter(meetup => meetup.happeningOn.getTime() > Date.now());
    return upcomings;
  }

  /**
   * Get a meetup by id
   * @param {number} id - The primary key of a meetup to find
   * @return {object} Data for the specified meetup id
   */
  static getById(id) {
    return meetups.find(item => item.id === id);
  }

  /**
   * Create a new meetup
   * @param {object} data - An object of properties for creating a meetup
   * @return {object} An object of created meetup
   */
  static create(data) {
    const meetupPropertyKeys = Object.keys(meetupSchema);
    const meetup = Object.assign({}, meetupSchema);
    const nextId = meetups[meetups.length - 1].id + 1;
    meetup.id = nextId;
    return new Promise((resolve, reject) => {
      meetupPropertyKeys.forEach((key) => {
        if (data[key]) {
          meetup[key] = data[key];
        }

        if (meetup[key] === undefined) {
          reject(new Error(`${key} is required`));
        }
      });
      // Save post meetup to database
      meetups.push(meetup);
      resolve(meetup);
    });
    // return meetup;
  }
}

export default Meetup;
