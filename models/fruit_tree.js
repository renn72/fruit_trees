const { Pool } = require('pg');

let db;
if (process.env.PRODUCTION) {
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  db = new Pool({
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
  });
}

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
