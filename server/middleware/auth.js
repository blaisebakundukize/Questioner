import jwt from 'jsonwebtoken';
import jwtKey from '../config/jwtkey';

/**
 * Authorize user
 * @param {Object} req - request made
 * @param {Object} res - response
 * @param {Method} next - passing control to other in a route
 */
function auth(req, res, next) {
  const token = req.header('x-user-token');
  let codeStatus = 400;
  try {
    if (token === undefined) {
      codeStatus = 401;
      throw new Error('Access denied. No token provided');
    }
    const decoded = jwt.decode(token, jwtKey.jwtPrivateKey);
    if (decoded === null) {
      throw new Error('Invalid token.');
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(codeStatus).send({
      status: codeStatus,
      error: err.message
    });
  }
}

export default auth;
