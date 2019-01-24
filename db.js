const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DEV_DB_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});
