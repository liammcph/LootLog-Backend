const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');

const verifyJwt = require('./middlewares/verify-jwt');

const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const incomeRouter = require('./controllers/income');
const expenseRouter = require('./controllers/expense');
const goalsRouter = require("./controllers/goals.js");

require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes

app.use('/auth', authController);

app.use(verifyJwt);

app.use('/users', userController);
app.use('/income', incomeRouter);
app.use('/expense', expenseRouter);
app.use('/goal', goalsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
