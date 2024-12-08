const bookService = require('../services/bookService');


exports.getAllBooks = (req, res) => {
    const books = bookService.getAllBooks();
  
    res.status(200).json(books);
  };