import db from '../database/index';

/**
 * This model represents tags
 * @exports
 * @class
 */
class Tag {
  /**
   * Get all tags
   * @returns {Array} Array of all tags
   */
  getAll() {
    const queryGetTags = 'SELECT * FROM tags';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetTags);
        if (!rows[0]) {
          reject(new Error('Tags are not available'));
        }
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get tag by id
   * @param {Number} id - id of a specified tag
   * @return {Object} data for specified tag
   */
  getById(id) {
    const queryGetTag = 'SELECT * FROM tags WHERE name = $1';
    return new Promise(async (resolve, reject) => {
      const { rows } = await db.query(queryGetTag, [id]);
      if (!rows[0]) {
        reject(new Error('Tag with the given id does not exit'));
      }
      resolve(rows);
    });
  }

  /**
   * Create a new Tag
   *@param {String} tag - Tag name
   */
  create(tag) {
    const queryCreateTag = 'INSERT INTO tags(name) VALUES ($1) returning *';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryCreateTag, [tag]);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create tags if not exist
   * @param {Array} names - Array of tags'names
   * @return {Array} Array of tags
   */
  createUnfoundTags(names) {
    return new Promise(async (resolve, reject) => {
      try {
        const tagsId = [];
        for (let i = 0; i < names.length; i += 1) {
          let retrievedTag = await this.getByName(names[i]);
          if (!retrievedTag[0]) {
            retrievedTag = await this.create(names[i]);
          }
          tagsId.push(retrievedTag[0].tag_id);
        }
        resolve(tagsId);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get tag by id
   * @param {String} tagName - tagName of a specified tag
   * @return {Object} data for specified tag
   */
  getByName(tagName) {
    const queryGetTag = 'SELECT * FROM tags WHERE name = $1';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetTag, [tagName]);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Insert multiple tags Id with meetup Id
   * @param {Array} tagsId - Array of tag ids
   * @param {Number} meetupId - meetup id
   */
  meetupHasTags(tagsId, meetupId) {
    const queryMeetupHasTag = 'iNSERT INTO meetup_has_tags(tag, meetup) values($1, $2)';
    return new Promise(async (resolve, reject) => {
      try {
        const result = tagsId.map((tag) => {
          const rows = db.query(queryMeetupHasTag, [tag, meetupId]);
          return rows[0];
        });
        await Promise.all(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Tag();
