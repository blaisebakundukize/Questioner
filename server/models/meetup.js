import userDataSchema from '../utils/useDataSchemas';

/**
 * This model represents meetup data
 * @class
 * @exports
 */
class Meetup {
  /**
   * @constructor
   */
  constructor() {
    this.meetups = [];
    this.meetupsSchema = {
      id: undefined,
      topic: undefined,
      description: undefined,
      location: undefined,
      images: null,
      happeningOn: undefined,
      tags: undefined,
      createdBy: undefined,
      createdOn: null,
      updatedOn: null
    };
  }

  /**
   * Create a new meetup
   * @param {Object} data - An object of properties for creating a meetup
   * @return {object} An object of created meetup
   */
  async create(data) {
    const nextId = this.meetups.length === 0 ? 1 : (this.meetups[this.meetups.length - 1].id + 1);
    return new Promise(async (resolve, reject) => {
      try {
        const isTheMeetupNew = await this.getByPropertyValues(data);

        if (isTheMeetupNew) {
          const meetup = await userDataSchema(data, nextId, this.meetupsSchema);

          this.meetups.push(meetup);
          resolve(meetup);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get a meetup by topic, description , location and happeningOn
   * @param {Object} data - Meetup data
   * @return {object} Data for the specified meetup id
   */
  getByPropertyValues(data) {
    return new Promise((resolve, reject) => {
      const meetup = this.meetups.find(m => m.topic === data.topic && m.description === data.description && m.location === data.location && m.happeningOn === data.happeningOn);
      if (meetup !== undefined) {
        reject(new Error('Meetup is already stored'));
      } else {
        resolve(true);
      }
    });
  }

  /**
   * Get all meetups
   * @returns {Array} An array of all meetups
   */
  getAll() {
    return new Promise((resolve, reject) => {
      const meetupsLength = this.meetups.length;
      if (meetupsLength === 0) {
        reject(new Error('Meetups are not found'));
      } else {
        resolve(this.meetups);
      }
    });
  }

  /**
   * Get upcoming meetups
   * @returns {Array} An array of upcoming meetups
   */
  getUpcoming() {
    return new Promise((resolve, reject) => {
      const upcomings = this.meetups.filter(meetup => new Date(meetup.happeningOn).getTime() > Date.now());
      if (upcomings.length === 0) {
        reject(new Error('Meetups are not found'));
      } else {
        resolve(upcomings);
      }
    });
  }

  /**
   * Get a meetup by id
   * @param {number} id - The primary key of a meetup to find
   * @return {object} Data for the specified meetup id
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      const meetup = this.meetups.find(item => item.id === id);
      if (meetup === undefined) {
        reject(new Error('Meetup with the given id is not exist'));
      } else {
        resolve(meetup);
      }
    });
  }
}

export default new Meetup();
