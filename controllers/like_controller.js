const express = require('express');
const router = express.Router();
const Like = require('../models/like.js');

router.get('/', (req, res, next) => {
  Like.findAll().then((dbResponse) => {
    res.json(dbResponse.rows);
  });
});

router.post('/', (req, res) => {
  const { fruit_tree_id, user_id } = req.body;

  Like.create(fruit_tree_id, user_id).then((dbResponse) => {
    res.status(201).json({
      message: 'new Like created',
      like: dbResponse.rows[0],
    });
  });
});

router.delete('/:id', (req, res) => {
  Like.delete(req.params.id).then((dbResponse) => {
    res.json({ message: 'Like deleted' });
  });
});

router.put('/:id', (req, res) => {});

router.get('/:id', (req, res) => {
  Like.findOne(req.params.id).then((dbResponse) => {
    res.json(dbResponse.rows[0]);
  });
});

module.exports = router;
