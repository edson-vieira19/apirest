const express = require('express');

const bookRoutes = express.Router();

const bookController = require('../controllers/bookController');



bookRoutes.get('/books', bookController.getAllBooks);








module.exports = bookRoutes;