const express = require('express');
const router = express.Router();
const FruitTree = require('../models/fruit_tree.js');
const validateFruitTree = require('../middlewares/validate_fruit_tree.js');
const formatFruitTrees = require('../middlewares/fruit_trees_format.js');

router.get('/', (req, res, next) => {
  FruitTree.findAll().then((dbResponse) => {
    res.json(formatFruitTrees(dbResponse.rows));
  });
});

router.post('/', validateFruitTree, (req, res) => {
  const { name, loc_lat, loc_long, details, image_url, create_at, user_id } =
    req.body;

  create_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

  FruitTree.create(
    name,
    loc_lat,
    loc_long,
    details,
    image_url,
    create_at,
    user_id
  ).then((dbResponse) => {
    res.status(201).json({
      message: 'new fruit tree placed',
      fruit_tree: dbResponse.rows[0],
    });
  });
});

router.delete('/:id', (req, res) => {
  FruitTree.delete(req.params.id).then((dbResponse) => {
    res.json({ message: 'delete success' });
  });
});

router.put('/:id', (req, res) => {});

router.get('/:id', (req, res) => {
  FruitTree.findOne(req.params.id).then((dbResponse) => {
    res.json(formatFruitTrees(dbResponse.rows)[0]);
  });
});

module.exports = router;
