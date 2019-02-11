const createAdminQuery = `INSERT into users(
  firstname,
  lastname,
  othername,
  email,
  phone_number,
  username,
  password,
  is_admin) SELECT $1, $2, $3, $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT * FROM users);`;

const createTablesQuery = `CREATE TABLE IF NOT EXISTS users
(
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  othername VARCHAR(60) NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  registered_on TIMESTAMP default current_timestamp
);

CREATE TABLE IF NOT EXISTS meetups (
  meetup_id SERIAL PRIMARY KEY,
  topic text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  happening_on TIMESTAMP NOT NULL,
  created_on TIMESTAMP default current_timestamp,
  updated_on TIMESTAMP,
  created_by integer REFERENCES users(user_id) ON DELETE CASCADE,
  image_urls text[]
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id SERIAL PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  created_by integer REFERENCES users(user_id) ON DELETE CASCADE,
  meetup integer NOT NULL,
  title text,
  body text NOT NULL,
  votes integer NOT NULL DEFAULT 1,
  created_on TIMESTAMP DEFAULT current_timestamp,
  updated_on TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS meetup_has_tags (
  tag integer REFERENCES tags(tag_id) ON DELETE CASCADE,
  meetup integer REFERENCES meetups(meetup_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rsvps (
  rsvp_id SERIAL PRIMARY KEY,
  meetup integer REFERENCES meetups(meetup_id) ON DELETE CASCADE,
  "user" integer REFERENCES users(user_id) ON DELETE CASCADE,
  response text NOT NULL,
  created_on TIMESTAMP DEFAULT current_timestamp,
  updated_on TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS voters (
  voter_id SERIAL PRIMARY KEY,
  "user" integer REFERENCES users(user_id) ON DELETE CASCADE,
  question integer REFERENCES questions(question_id) ON DELETE CASCADE,
  vote_type text NOT NULL,
  created_on TIMESTAMP DEFAULT current_timestamp,
  updated_on TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS comments (
  comment_id SERIAL PRIMARY KEY,
  created_by integer REFERENCES users(user_id) ON DELETE CASCADE,
  question integer REFERENCES questions(question_id) ON DELETE CASCADE,
  body text NOT NULL,
  created_on TIMESTAMP DEFAULT current_timestamp,
  updated_on TIMESTAMP DEFAULT current_timestamp
);`;

export {
  createTablesQuery,
  createAdminQuery
};
