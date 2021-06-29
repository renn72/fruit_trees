const { Pool } = require('pg');
const _ = require('lodash');

const db = new Pool({
  database: 'fruit_tree_finder',
  user: 'student', // for david you can comment out
  password: 'mypass', // for david you can comment out
});

const createFruitTree = () => {};

for (let i = 0; i < 10; i++) {}
