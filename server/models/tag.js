import tags from '../database/tags';

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
  static getAll() {
    return tags;
  }

  /**
   * Get tags by ids
   * @param {Array} ids - Array of tags' ids to retrieve
   * @returns {Array} Array of tags
   */
  static getTags(ids) {
    return ids.map(this.getById);
  }

  /**
   * Get tag by id
   * @param {Number} id - id of a specified tag
   * @return {Object} data for specified tag
   */
  static getById(id) {
    return tags.find(tag => tag.id === id);
  }
}

export default Tag;
