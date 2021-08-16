const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// routes
app.use(require('./routes/htmlRoutes.js'));
app.use(require('./routes/apiRoutes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
