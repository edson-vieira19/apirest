const express = require('express');
const bookRoutes = express.Router();

const bookController = require('../controllers/bookController');
const { validateBook, validateBookId } = require('../validators/bookValidator')
const {verifyAdmin} = require('../middlewares/userAuth');



//obs: qualquer um pode acessar os livros, mas so os administradores pode criar, editar ou excluir

bookRoutes.get('/books', bookController.getAllBooks);
bookRoutes.post('/books', verifyAdmin,validateBook, bookController.createBook);




module.exports = bookRoutes;