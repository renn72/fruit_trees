const { Pool } = require('pg');
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config();

const FruitTreeTypes = require('../models/fruit_tree_type.js');

const db = new Pool({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});

const names = [
  'michael',
  'dave',
  'naomi',
  'mistyrose',
  'john',
  'jim',
  'gary',
  'rob',
  'jo',
  'jen',
  'jeff',
  'michael',
  'dave',
  'naomi',
  'mistyrose',
  'john',
  'jim',
  'gary',
  'rob',
  'jo',
  'jen',
  'jeff',
];
const trees = FruitTreeTypes.types;

const comments = [
  'nice tree',
  'shit tree',
  'happy tree',
  'sad tree',
  'nice fruit',
  'sad fruit',
  'tall tree',
];

const createUser = async (name, email, password_digest) => {
  const sql = `
    insert into users (name, email, password_digest) 
    values ($1, $2, $3)`;

  return db.query(sql, [name, email, password_digest]);
};

const createFruitTree = async (
  name,
  loc_lat,
  loc_long,
  details,
  image_url,
  create_at,
  user_id
) => {
  const sql = `
    insert into fruit_trees (name, loc_lat, loc_long, details, image_url, create_at, user_id)
    values ($1, $2, $3, $4, $5, $6, $7) returning *`;

  return db.query(sql, [
    name,
    loc_lat,
    loc_long,
    details,
    image_url,
    create_at,
    user_id,
  ]);
};

const getUserIds = () => {
  const sql = `select id from users;`;
  return db.query(sql, []);
};

const getFruitTreeIds = () => {
  const sql = `select id from fruit_trees;`;
  return db.query(sql, []);
};

const createComment = async (body, fruit_tree_id, user_id) => {
  const sql = `
    insert into comments (body, fruit_tree_id, user_id) 
    values ($1, $2, $3)`;

  return db.query(sql, [body, fruit_tree_id, user_id]);
};

const createLike = async (fruit_tree_id, user_id) => {
  const sql = `
    insert into likes (fruit_tree_id, user_id) 
    values ($1, $2)`;

  return db.query(sql, [fruit_tree_id, user_id]);
};

const seed = async () => {
  for await (const name of names) {
    await createUser(
      name,
      `${name}+${_.random(0, 1000)}@${name}.${name}`,
      name
    );
  }

  let userIds = await getUserIds();
  userIds = userIds.rows.map((id) => id.id);

  let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  for (let i = 0; i < 10; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-37.67, -37.81),
        _.random(144.75, 145.1),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }
  for (let i = 0; i < 2; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-37.75, -37.97),
        _.random(145, 145.35),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }
  for (let i = 0; i < 2; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-37.75, -37.97),
        _.random(145, 145.35),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }
  for (let i = 0; i < 2; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-37.63, -37.83),
        _.random(144.67, 145.12),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }
  for (let i = 0; i < 1; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-37.93, -38.2),
        _.random(145.12, 145.37),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }
  for (let i = 0; i < 1; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-38.21, -38.39),
        _.random(145.03, 145.19),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }

  for (let i = 0; i < 1; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-38.07, -38.21),
        _.random(145.31, 145.35),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }

  for (let i = 0; i < 1; i++) {
    for await (const tree of trees) {
      await createFruitTree(
        tree,
        _.random(-37.8, -37.86),
        _.random(144.66, 144.9),
        `a pretty ${tree} tree`,
        'address',
        timestamp,
        _.sample(userIds)
      );
    }
  }

  let fruitTreeIds = await getFruitTreeIds();
  fruitTreeIds = fruitTreeIds.rows.map((id) => id.id);

  for (let i = 0; i < 250; i++) {
    createComment(
      _.sample(comments),
      _.sample(fruitTreeIds),
      _.sample(userIds)
    );
    createLike(_.sample(fruitTreeIds), _.sample(userIds));
  }
};

seed();
