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
  console.log(token);
  if (!token) {
    res.status(401).send({
      status: 401,
      error: 'Access denied. No token provided'
    });
  }

  try {
    const decoded = jwt.decode(token, jwtKey.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({
      status: 400,
      error: 'Invalid token.'
    });
  }
}

export default auth;
