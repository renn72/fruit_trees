const { Pool } = require('pg');
const _ = require('lodash');

const db = new Pool({
  database: 'fruit_tree_finder',
  user: 'student', // for david you can comment out
  password: 'mypass', // for david you can comment out
});

const createUser = (name, email, password_digest) => {
  const sql = `
    insert into users (name, email, password_digest) 
    values ($1, $2, $3)`;

  db.query(sql, [name, email, password_digest]);
};

const names = ['michael', 'dave', 'naomi', 'mistyrose'];

names.forEach((name) => createUser(name, `${name}@${name}.${name}`, name));
