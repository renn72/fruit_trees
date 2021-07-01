const express = require('express');
const router = express.Router();
const FruitTreeType = require('../models/fruit_tree_type.js');

router.get('/', (req, res, next) => {
  res.send(FruitTreeType.types);
});

module.exports = router;
