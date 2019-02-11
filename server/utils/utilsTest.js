import User from '../models/user';
import generateJwtToken from '../middleware/generateJwtToken';
import jwtkey from '../config/jwtkey';

const registerUser = async () => {
  try {
    const user = {
      firstname: 'testing',
      lastname: 'testing',
      othername: '',
      email: 'testing@gmail.com',
      phoneNumber: '000-000-0000',
      username: 'integration',
      password: 'testing'
    };
    const registeredUser = await User.create(user);
    console.info(registeredUser);
    // jwtkey.jwtPrivateKey = 'jwtKeyForToken';
    const token = generateJwtToken(registeredUser.user_id, registeredUser.username, registeredUser.is_admin);
    return { username: user.username, password: 'testing', token };
  } catch (err) {
    throw new Error(err);
  }
};

export default registerUser;
