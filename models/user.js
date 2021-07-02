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

const User = {
  findAll() {
    const sql = 'select * from users;';
    return db.query(sql);
  },

  create(name, email, password_digest) {
    const sql = `
      insert into users (name, email, password_digest) 
      values ($1, $2, $3) returning *;
    `;

    return db.query(sql, [name, email, password_digest]);
  },

  findOne(id) {
    const sql = 'select * from users where id = $1;';
    return db.query(sql, [id]);
  },

  checkLogin(email) {
    const sql = 'select * from users where email = $1;';
    return db.query(sql, [email]);
  },

  delete(id) {
    const sql = 'delete from users where id = $1;';
    return db.query(sql, [id]);
  },
};

module.exports = User;
