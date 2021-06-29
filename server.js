const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8080;

const fruitTreeController = require('./controllers/fruit_tree_controller.js');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(morgan('dev')); // logger

app.use(express.static('client'));

app.use(express.json());

app.get('/api/trees', fruitTreeController);
