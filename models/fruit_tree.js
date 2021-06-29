const { Pool } = require('pg');

const db = new Pool({
  database: 'fruit_tree_finder',
  user: 'student', // for david you can comment out
  password: 'mypass', // for david you can comment out
});

const FruitTree = {
  findAll() {
    const sql = 'select * from fruit_trees;';
    return db.query(sql);
  },

  create(name, loc_lat, loc_long, details, image_url, create_at, user_id) {
    const sql = `
      insert into fruit_trees (name, loc_lat, loc_long, details, image_url, create_at, user_id) 
      values ($1, $2, $3, $4, $5, $6, $7) returning *;
    `;

    return db.query(sql, [
      name,
      loc_lat,
      loc_long,
      details,
      image_url,
      create_at,
      user_id,
    ]);
  },

  findOne(id) {
    const sql = 'select * from fruit_trees where id = $1';
    return db.query(sql, [id]);
  },

  delete(id) {
    const sql = 'delete from fruit_trees where id = $1';
    return db.query(sql, [id]);
  },
};

module.exports = FruitTree;
