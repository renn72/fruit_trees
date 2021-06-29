CREATE DATABASE fruit_tree_finder;

CREATE TABLE fruit_trees (
  id SERIAL PRIMARY KEY,
  tree_type TEXT,
  loc_lat FLOAT,
  loc_long FLOAT,
  details TEXT,
  user INT,
);

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT,
);

