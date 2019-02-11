import dotenv from 'dotenv';

dotenv.config();

export default {
  development: process.env.DEV_DB_URL,
  production: process.env.DATABASE_URL,
  test: process.env.TEST_DB_URL,
  firstname: process.env.ADMIN_FIRSTNAME,
  lastname: process.env.ADMIN_LASTNAME,
  othername: process.env.ADMIN_OTHERNAME,
  email: process.env.ADMIN_EMAIL,
  phone: process.env.ADMIN_PHONE,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  isAdmin: process.env.ADMIN_ISADMIN
};
