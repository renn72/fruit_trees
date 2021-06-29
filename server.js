const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT || 8080;

const fruitTreeController = require('./controllers/fruit_tree_controller.js');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static('client'));

app.use(express.json());

app.get('/api/trees', fruitTreeController);
