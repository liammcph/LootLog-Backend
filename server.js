const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');


require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes







app.listen(3000, () => {
  console.log('The express app is ready!');
});
