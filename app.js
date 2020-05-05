// Initialize app
require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const xssFilter = require('x-xss-protection');
const logger = require('morgan');

const port = process.env.PORT || 1700;

// Import all routes
const userRoute = require('./src/routes/user');

// Serve app
app.listen(port, () => {
    console.log(`Server started with port ${port}`)
})

// Set Plugins
app.use(xssFilter());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set routes
app.use('/users', userRoute)