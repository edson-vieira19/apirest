const express = require('express');

const authorRoutes = express.Router();

const authorController = require('../controllers/authorController')
const {validateAuthor} = require('../validators/authorValidator')


authorRoutes.get('/authors', authorController.getAllAuthors);
authorRoutes.post('/authors', validateAuthor, authorController.saveAuthor);






module.exports = authorRoutes;