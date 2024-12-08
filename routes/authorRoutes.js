const express = require('express');

const authorRoutes = express.Router();

const authorController = require('../controllers/authorController')
const { validateAuthor, validateAuthorId, validateUpdateAuthor } = require('../validators/authorValidator');
const { verifyAdmin } = require('../middlewares/userAuth');


authorRoutes.get('/authors', authorController.getAllAuthors);
authorRoutes.post('/authors', validateAuthor, verifyAdmin, authorController.saveAuthor);
authorRoutes.get('/authors/:id', validateAuthorId, authorController.getAuthorById);
authorRoutes.put('/authors/:id', verifyAdmin, validateAuthorId, validateUpdateAuthor, authorController.updateAuthor);
authorRoutes.delete('/authors/:id', verifyAdmin, validateAuthorId, authorController.deleteAuthor )

module.exports = authorRoutes;