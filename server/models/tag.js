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

  /**
   * Get tags by Names
   * @param {Array} names - Array of tags'names to fetch
   * @return {Array} Array of tags
   */
  static getTagsIdByNames(names) {
    const tagsFound = names.map((name) => {
      const tag = this.getByName(name);
      if (tag === undefined) throw new Error(`${name} tag is not exist`);
      return tag.id;
    });
    return tagsFound;
  }

  /**
   * Get tag by id
   * @param {String} tagName - tagName of a specified tag
   * @return {Object} data for specified tag
   */
  static getByName(tagName) {
    return tags.find(tag => tag.name === tagName);
  }
}

export default Tag;
