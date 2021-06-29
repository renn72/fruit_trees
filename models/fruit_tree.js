const { Pool } = require('pg');

const db = new Pool({
  database: 'fruit_tree_finder',
  user: 'student', // for david you can comment out
  password: 'mypass', // for david you can comment out
});

const FruitTree = {};

module.exports = FruitTree;
