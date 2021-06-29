CREATE DATABASE fruit_tree_finder;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password_digest TEXT
);

CREATE TABLE fruit_trees (
  id SERIAL PRIMARY KEY,
  name TEXT CHECK(length(name) > 0),
  image_url TEXT,
  loc_lat FLOAT,
  loc_long FLOAT,
  details TEXT,
  create_at TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  body VARCHAR(800),
  fruit_tree_id INTEGER,
  user_id INTEGER,
  FOREIGN KEY (fruit_tree_id) REFERENCES fruit_trees (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  fruit_tree_id INTEGER,
  user_id INTEGER,
  FOREIGN KEY (fruit_tree_id) REFERENCES fruit_trees (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
