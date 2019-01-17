/**
 * @param {Array} data - Array of data
 * @return {Number} Next id
 */
const nextId = data => (data.length === 0 ? 1 : (data[data.length - 1].id + 1));

export default nextId;
