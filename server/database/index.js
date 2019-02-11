import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dbConfig from '../config/db';
import { createTablesQuery, createAdminQuery } from './seed';

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

    if (env === 'test') {
      this.powerDb();
    }
  }

  /**
   * Method for running query
   * @param {String} queryText - Query to run
   * @param {Array} params - Values required by a query
   * @returns {Object} response
   */
  query(queryText, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await this.pool.connect();
        const response = await this.pool.query(queryText, params);
        client.release();
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Call methods to power db with tables and user admin
   */
  async powerDb() {
    await this.getDbPrepared();
    await this.insertAdmin();
  }

  /**
   * Method to power database with tables and admin
   */
  async getDbPrepared() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.query(createTablesQuery);
        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  /**
   * Power db with a user admin
   */
  insertAdmin() {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(dbConfig.password, salt);
        const values = [
          dbConfig.firstname,
          dbConfig.lastname,
          dbConfig.othername,
          dbConfig.email,
          dbConfig.phone,
          dbConfig.username,
          password,
          dbConfig.isAdmin
        ];
        await this.query(createAdminQuery, values);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}


export default new Db();
