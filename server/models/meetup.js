import db from '../database/index';
/**
 * This model represents meetup data
 * @class
 * @exports
 */
class Meetup {
  /**
   * Create a new meetup
   * @param {Object} data - An object of properties for creating a meetup
   * @return {object} An object of created meetup
   */
  create(data) {
    const createMeetup = 'INSERT INTO meetups(topic, description, location, happening_on, created_by, image_urls) VALUES($1, $2, $3, $4, $5, $6)returning *';

    const values = [data.topic, data.description, data.location, data.happeningOn, data.createdBy, data.images];

    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(createMeetup, values);
        // console.log(rows);
        resolve(rows[0]);
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
    const getMeetupByProperties = 'SELECT * FROM meetups WHERE topic = $1 AND description = $2 AND happening_on = $3 AND location = $4';
    const values = [data.topic, data.description, data.happeningOn, data.location];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(getMeetupByProperties, values);
        if (rows[0]) {
          reject(new Error('Meetup is already stored'));
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Meetup();
