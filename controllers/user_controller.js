const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res, next) => {
  User.findAll().then((dbResponse) => {
    res.json(dbResponse.rows);
  });
});

router.post('/', (req, res) => {
  const { name, email, password_digest } = req.body;

  User.create(name, email, password_digest).then((dbResponse) => {
    res.status(201).json({
      message: 'new user created',
      user: dbResponse.rows[0],
    });
  });
});

router.delete('/:id', (req, res) => {
  User.delete(req.params.id).then((dbResponse) => {
    res.json({ message: 'user deleted' });
  });
});

router.put('/:id', (req, res) => {});

router.get('/:id', (req, res) => {
  User.findOne(req.params.id).then((dbResponse) => {
    res.json(dbResponse.rows[0]);
  });
});

module.exports = router;
