import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtPrivateKey: process.env.JWT_PR_KY
};
