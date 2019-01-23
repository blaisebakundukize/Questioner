import bcrypt from 'bcryptjs';
import user from '../models/user';
import { validateUser } from '../utils/validateData';

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
      const isUsernameUsed = await user.getUser(req.body.username);
      if (isUsernameUsed) {
        throw new Error('Username is already used');
      }
      if (isUserValidated && isUserEmailUsed) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const savedUser = await user.create(req.body);
        console.log(savedUser);
        res.status(201).send({
          status: 201,
          data: [{ firstname: savedUser.firstname, lastname: savedUser.lastname, username: savedUser.username }]
        });
      }
    } catch (error) {
      res.status(400).send({
        status: 400,
        error: error.message
      });
    }
  }
}

export default new User();
