const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.js');

router.get('/', (req, res, next) => {
  Comment.findAll().then((dbResponse) => {
    res.json(dbResponse.rows);
  });
});

router.post('/', (req, res) => {
  const { body, fruit_tree_id, user_id } = req.body;

  Comment.create(body, fruit_tree_id, user_id).then((dbResponse) => {
    res.status(201).json({
      message: 'new Comment created',
      fruit_tree: dbResponse.rows[0],
    });
  });
});

router.delete('/:id', (req, res) => {
  Comment.delete(req.params.id).then((dbResponse) => {
    res.json({ message: 'Comment deleted' });
  });
});

router.put('/:id', (req, res) => {});

router.get('/:id', (req, res) => {
  Comment.findOne(req.params.id).then((dbResponse) => {
    res.json(dbResponse.rows[0]);
  });
});

module.exports = router;
