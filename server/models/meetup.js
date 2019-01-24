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

  /**
   * Get all meetups
   * @returns {Array} An array of all meetups
   */
  getAll() {
    const queryGetAllMeetups = 'SELECT m.meetup_id AS id, m.topic AS title, m.description, m.location, m.happening_on AS "happeningOn", (select array_agg(t.name) from tags t INNER JOIN meetup_has_tags mht ON mht.tag = t.tag_id WHERE mht.meetup = m.meetup_id) AS tags FROM meetups m';

    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetAllMeetups);
        if (rows.length === 0) {
          reject(new Error('Meetups are not found'));
        } else {
          resolve(rows);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
 * Get upcoming meetups
 * @returns {Array} An array of upcoming meetups
 */
  getUpcoming() {
    const queryGetUpcoming = 'SELECT m.meetup_id AS id, m.topic AS title, m.description, m.location, m.happening_on AS "happeningOn", (select array_agg(t.name) from tags t INNER JOIN meetup_has_tags mht ON mht.tag = t.tag_id WHERE mht.meetup = m.meetup_id) AS tags FROM meetups m WHERE m.happening_on >= (Now())';

    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetUpcoming);
        if (rows.length === 0) {
          reject(new Error('Meetups are not found'));
        } else {
          resolve(rows);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Meetup();
