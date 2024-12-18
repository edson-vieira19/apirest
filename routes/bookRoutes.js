const express = require('express');
const bookRoutes = express.Router();

const bookController = require('../controllers/bookController');
const { validateBook, validateBookId, validateUpdateBook } = require('../validators/bookValidator')
const {verifyAdmin} = require('../middlewares/userAuth');



//obs: qualquer um pode acessar os livros, mas so os administradores pode criar, editar ou excluir

bookRoutes.get('/books', bookController.getAllBooks);
bookRoutes.post('/books', verifyAdmin,validateBook, bookController.createBook);
bookRoutes.get('/books/:id', validateBookId, bookController.getBookById);
bookRoutes.put('/books/:id',verifyAdmin ,validateBookId, validateUpdateBook , bookController.updateBook);
bookRoutes.delete('/books/:id', verifyAdmin,validateBookId, bookController.deleteBook);


module.exports = bookRoutes;