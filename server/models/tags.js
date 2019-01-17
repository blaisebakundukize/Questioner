import nextId from '../utils/nextId';

/**
 * This model represents tags
 * @exports
 * @class
 */
class Tag {
  /**
   * @constructor
   */
  constructor() {
    this.tags = [];
  }

  /**
   * Get all tags
   * @returns {Array} Array of all tags
   */
  getAll() {
    return this.tags;
  }

  /**
   * Get tags by ids
   * @param {Array} ids - Array of tags' ids to retrieve
   * @returns {Array} Array of tags
   */
  getTags(ids) {
    return ids.map(this.getById);
  }

  /**
   * Get tag by id
   * @param {Number} id - id of a specified tag
   * @return {Object} data for specified tag
   */
  getById(id) {
    return this.tags.find(tag => tag.id === id);
  }

  /**
   * Create a new Tag
   *@param {String} tag - Tag name
   */
  create(tag) {
    const nId = nextId(this.tags);
    this.tags.push({ id: nId, name: tag });
    return { id: nId, name: tag };
  }

  /**
   * Create tags if not exist
   * @param {Array} names - Array of tags'names
   * @return {Array} Array of tags
   */
  createUnfoundTags(names) {
    const createdTags = names.map((name) => {
      let tag = this.getByName(name);
      if (tag === undefined) {
        tag = this.create(name);
      }
      return tag;
    });
    return createdTags;
  }

  /**
   * Get tags by Names
   * @param {Array} names - Array of tags'names to fetch
   * @return {Array} Array of tags
   */
  getTagsIdByNames(names) {
    const tagsFound = names.map((name) => {
      const tag = this.getByName(name);
      return tag.id;
    });
    return tagsFound;
  }

  /**
   * Get tag by id
   * @param {String} tagName - tagName of a specified tag
   * @return {Object} data for specified tag
   */
  getByName(tagName) {
    return this.tags.find(tag => tag.name === tagName);
  }
}

export default new Tag();
