const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT || 3001;

const errorHandler = require('./middlewares/error_handler.js');
const fruitTreeController = require('./controllers/fruit_tree_controller.js');
const userController = require('./controllers/user_controller.js');
const commentController = require('./controllers/comment_controller.js');
const likeController = require('./controllers/like_controller.js');
const typeController = require('./controllers/type_controller.js');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  session({
    secret: 'super duper secret squirrel',
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.static('client'));

app.use(express.json());

app.use('/api/types', typeController);

app.use('/api/trees', fruitTreeController);

app.use('/api/users', userController);

app.use('/api/comments', commentController);

app.use('/api/likes', likeController);

app.use(errorHandler);
