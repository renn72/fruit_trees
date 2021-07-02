const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({ message: 'User logged in', loggedIn: true });
  } else {
    res.status(418).json({ message: 'User not logged in', loggedIn: false });
  }
});
