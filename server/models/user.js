import db from '../database/index';

/**
 * Class represents user
 * @class
 */
class User {
  /**
   * Create a user
   * @param {Object} user - user details
   * @returns {Object} Stored user
   */
  create(user) {
    const createUser = 'INSERT INTO users (firstname, lastname, othername, email, phone_number, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';

    const values = [user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username, user.password];
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(createUser, values);
        resolve(rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get user username
   * @param {String} username - Username
   * @return {Object} user details
   */
  getUser(username) {
    const getUser = ' SELECT * FROM users WHERE username = $1';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(getUser, [username]);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get user by username
   * @param {String} email - Username
   * @return {Object} user details
   */
  getUserByEmail(email) {
    const getUser = ' SELECT username FROM users WHERE email = $1';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(getUser, [email]);
        if (rows[0]) {
          reject(new Error('Email is already used'));
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * get user by phone number
   * @param {String} phoneNumber - User phone number
   * @returns {Promise} Resolve as boolean or Reject
   */
  getUserByPhone(phoneNumber) {
    const queryGetUser = 'SELECT username FROM users WHERE phone_number = $1';
    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.query(queryGetUser, [phoneNumber]);
        console.log(rows);
        if (rows[0]) {
          reject(new Error('Phone number is already registered with another account'));
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new User();
