const express = require('express');
const Route = express.Router();
const userController = require('../controllers/user');

Route
    .all('/*')
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/logout/:id', userController.register)

module.exports = Route;
