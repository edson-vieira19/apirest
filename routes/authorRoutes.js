const express = require('express');

const authorRoutes = express.Router();

const authorController = require('../controllers/authorController')
const { validateAuthor, validateAuthorId } = require('../validators/authorValidator')


authorRoutes.get('/authors', authorController.getAllAuthors);
authorRoutes.post('/authors', validateAuthor, authorController.saveAuthor);
authorRoutes.get('/authors/:id', validateAuthorId, authorController.getAuthorById);



module.exports = authorRoutes;