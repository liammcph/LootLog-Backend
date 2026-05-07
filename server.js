const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');

const verifyJwt = require('./middlewares/verify-jwt');

const incomeRouter = require('./controllers/income')

require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/income', incomeRouter)
app.use(verifyJwt);
app.use('/auth', authController);
app.use('/users', userController);







app.listen(3000, () => {
  console.log('The express app is ready!');
});
