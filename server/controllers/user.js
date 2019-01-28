import bcrypt from 'bcryptjs';
import Joi from 'joi';
import user from '../models/user';
import { validateUser } from '../utils/validateData';
import generateJwtToken from '../middleware/generateJwtToken';

/**
 * Controller of User model
 * @class
 */
class User {
  /**
   * Create User
   * @param {Object} req - Request made by user
   * @param {Object} res - Response
   * @return {Object} Response
   */
  async create(req, res) {
    try {
      const isUserValidated = await validateUser(req.body);
      const isUserEmailUsed = await user.getUserByEmail(req.body.email);
      const isPhoneUsed = await user.getUserByPhone(req.body.phoneNumber);
      const isUsernameUsed = await user.getUser(req.body.username);
      if (isUsernameUsed[0]) {
        throw new Error('Username is already used');
      }
      if (isUserValidated && isUserEmailUsed && isPhoneUsed) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const savedUser = await user.create(req.body);
        const token = generateJwtToken(user.user_id, user.username, user.is_admin);
        res.status(201).header('x-user-token', token).send({
          status: 201,
          data: [{
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
            username: savedUser.username,
            token
          }]
        });
      }
    } catch (error) {
      res.status(400).send({
        status: 400,
        error: error.message
      });
    }
  }

  /**
   * Create User
   * @param {Object} req - Request made by user
   * @param {Object} res - Response
   * @return {Object} Response
   */
  async login(req, res) {
    const schema = Joi.object().keys({
      username: Joi.string().min(8).max(50).required(),
      password: Joi.string().min(6).max(30).required()
    });
    const { error } = Joi.validate(req.body, schema);
    try {
      if (error) {
        throw new Error(error.details[0].message);
      }
      const getUser = await user.getUser(req.body.username);
      const {
        username,
        firstname,
        lastname,
        password
      } = getUser[0];
      const validPassword = await bcrypt.compare(req.body.password, password);
      if (!validPassword) throw new Error('Invalid email or password.');
      const token = generateJwtToken(getUser[0].user_id, username, getUser[0].is_admin);
      return res.status(200).header('x-user-token', token).send({
        status: 200,
        data: [{
          firstname,
          lastname,
          username,
          token
        }]
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: err.message
      });
    }
  }
}

export default new User();
