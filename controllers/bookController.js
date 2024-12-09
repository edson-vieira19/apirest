const bookService = require('../services/bookService');


exports.getAllBooks = (req, res) => {
    const books = bookService.getAllBooks();
  
    res.status(200).json(books);
  };

exports.createBook = async (req, res) => {

    const {titulo, id_autor, genero, editora, ano, faixaEtaria} = req.body;

    const newBook = await bookService.createBook(titulo, id_autor, genero, editora, ano, faixaEtaria);

    if(newBook){
    res.status(201).json(newBook);
    }
    else{
      res.status(500).json({ message: "Erro ao criar o livro, autor invalido"});
    }
    
}  