const express = require('express');
const router = express.Router();
const FruitTree = require('../models/fruit_tree.js');

router.get('/', (req, res, next) => {
  FruitTree.findAll().then((dbResponse) => {
    res.json(dbResponse.rows);
  });
});

router.post('/', (req, res) => {
  const { name, loc_lat, loc_long, details, image_url, create_at, user_id } =
    req.body;

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
    res.json(dbResponse.rows[0]);
  });
});

module.exports = router;
