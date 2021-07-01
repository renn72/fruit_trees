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

const Like = {
  findAll() {
    const sql = 'select * from comments;';
    return db.query(sql);
  },

  create(fruit_tree_id, user_id) {
    const sql = `
      insert into users (body, fruit_tree_id, user_id) 
      values ($1, $2) returning *;
    `;

    return db.query(sql, [fruit_tree_id, user_id]);
  },

  findOne(id) {
    const sql = 'select * from users where id = $1';
    return db.query(sql, [id]);
  },

  delete(id) {
    const sql = 'delete from users where id = $1';
    return db.query(sql, [id]);
  },
};

module.exports = Like;
