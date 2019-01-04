import meetups, { meetupSchema } from '../database/meetups';
// import tags from '../database/tags';

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
   * @return {Object} Contains properties of a created meetup
   */
  // static create(data) {
  // }
}

export default Meetup;
