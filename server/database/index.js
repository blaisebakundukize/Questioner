import dotenv from 'dotenv';
import { Pool } from 'pg';
import dbConfig from '../config/db';

// Access env variables
dotenv.config();
// Configurate the environment to use
const env = process.env.NODE_ENV || 'development';

/**
 * Class represents DB Configuration
 * @class
 */
class Db {
  /**
   * Initialize connection
   * @constructor
   */
  constructor() {
    this.pool = new Pool({
      connectionString: dbConfig[env]
    });
  }

  /**
   * Method for running query
   * @param {String} queryText - Query to run
   * @param {Array} params - Values required by a query
   * @returns {Object} response
   */
  async query(queryText, params) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.pool.query(queryText, params);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}


export default new Db();
