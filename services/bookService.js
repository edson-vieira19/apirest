const bookModel = require('../models/bookModel');

exports.getAllBooks = () => bookModel.getAllBooks();

exports.createBook = async (titulo, id_autor, genero, editora, ano, faixaEtaria) =>{

    return await bookModel.createBook(titulo, id_autor, genero, editora, ano, faixaEtaria);
    
}

exports.getBookById = (id) => bookModel.getBookById(id);

exports.updateBook = async (id, titulo, id_autor, genero, editora, ano, faixaEtaria) =>{
    
    return await bookModel.updateBook(id, titulo, id_autor, genero, editora, ano, faixaEtaria);
}