import jwt from 'jsonwebtoken';
import jwtKey from '../config/jwtkey';

/**
 * Generate JWT token
 * @param {Number} userId - user id
 * @param {String} username - user username
 * @param {Boolean} isAdmin - user admin status
 */
const generateJwtToken = (userId, username, isAdmin) => jwt.sign({ userId, username, isAdmin }, jwtKey.jwtPrivateKey);

export default generateJwtToken;
