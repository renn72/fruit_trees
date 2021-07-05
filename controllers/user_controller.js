const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const validateUser = require('../middlewares/validate_user.js');
const validateUserLogin = require('../middlewares/validate_user_login.js');

router.get('/', (req, res, next) => {
  User.findAll().then((dbResponse) => {
    res.json(dbResponse.rows);
  });
});

router.post('/', validateUser, (req, res) => {
  const { name, email, password_digest } = req.body;

  User.create(name, email, password_digest).then((dbResponse) => {
    res.status(201).json({
      message: 'new user created',
      user: dbResponse.rows[0],
    });
  });
});

router.put('/:id', validateUser, (req, res) => {
  const { name, email, password_digest } = req.body;
  const id = req.params.id;

  if (name.length < 1) {
    name = req.session.userName;
  }
  if (email.length < 1) {
    email = req.session.userEmail;
  }

  if (password_digest.length < 1) {
    password_digest = req.session.password_digest;
  }

  User.update(id, name, email, password_digest).then((dbResponse) => {
    res.status(201).json({
      message: 'user created updated',
      user: dbResponse.rows[0],
    });
  });
});

router.delete('/:id', (req, res) => {
  User.delete(req.params.id).then((dbResponse) => {
    res.json({ message: 'user deleted' });
  });
});

router.post('/login', (req, res) => {
  console.log(req.body);

  User.checkLogin(req.body.email).then((dbResponse) => {
    // console.log('database');
    // console.log(dbResponse.rows);
    if (dbResponse.rows.length > 0) {
      console.log('user');
      if (validateUserLogin(req.body, dbResponse.rows[0])) {
        console.log('login success');
        req.session.loggedIn = true;
        req.session.userId = dbResponse.rows[0].id;
        req.session.userName = dbResponse.rows[0].name;
        req.session.pwd = dbResponse.rows[0].password_digest;
        req.session.userEmail = dbResponse.rows[0].email;

        console.log(dbResponse.rows[0].id);
        console.log(req.session);
        res.status(200).json({
          message: 'logged in',
          userId: req.session.userId,
          userName: req.session.userName,
          userEmail: req.session.userEmail,
        });
      } else {
        console.log('login failed');
        res.status(418).json({ message: "user/password don't match" });
      }
    } else {
      console.log('no user');
      res.status(418).json({ message: "user doesn't exist" });
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {});
  res.json({ message: 'logged out' });
});

router.get('/logged', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({
      message: 'User logged in',
      loggedIn: true,
      userId: req.session.userId,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  } else {
    res.status(200).json({ message: 'User not logged in', loggedIn: false });
  }
});

router.get('/:id', (req, res) => {
  User.findOne(req.params.id).then((dbResponse) => {
    res.json(dbResponse.rows[0]);
  });
});

module.exports = router;
