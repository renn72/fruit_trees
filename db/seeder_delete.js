const { Pool } = require('pg');
const _ = require('lodash');

const db = new Pool({
  database: 'fruit_tree_finder',
  user: 'student', // for david you can comment out
  password: 'mypass', // for david you can comment out
});

db.query('delete from fruit_trees', []);
db.query('delete from users', []);
db.query('delete from likes', []);
db.query('delete from comments', []);
