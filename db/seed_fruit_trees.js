const { Pool } = require('pg');
const _ = require('lodash');

const db = new Pool({
  database: 'fruit_tree_finder',
  user: 'student', // for david you can comment out
  password: 'mypass', // for david you can comment out
});

const createFruitTree = (name, loc_lat, loc_long, details, user_id) => {
  const sql = `
    insert into fruit_trees (name, loc_lat, loc_long, details, user_id)
    values ($1, $2, $3, $4, $5) returning *`;

  db.query(sql, [name, loc_lat, loc_long, details, user_id]);
};

const trees = ['cherry', 'apple', 'pear', 'peach', 'pineapple', 'walnut'];

trees.forEach((tree) =>
  createFruitTree(tree, 1, 1, `a pretty ${tree} tree`, 2)
);
