const { Pool } = require('pg');
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config();

const db = new Pool({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});

db.query('delete from fruit_trees', []);
db.query('delete from users', []);
db.query('delete from likes', []);
db.query('delete from comments', []);
