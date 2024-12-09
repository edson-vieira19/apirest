const bookPersistence = require('../persistencia/bookPersistence')
const authorPersistence = require('../persistencia/authorPersistence')

let books = [];
let ultimoId = 0;

let authors = [];

const initBooks = async () => {
    books = await bookPersistence.loadBooks();
    authors = await authorPersistence.loadAuthors();
    ultimoId = books.length > 0 ? books[books.length - 1].id : 0;
};

initBooks();

exports.createBook = async (titulo, id_autor, genero, editora, ano, faixaEtaria) =>{

    if (!authors.find(author => author.id === id_autor)) {
        return null; // Autor não encontrado
    }

    const newBook = {
        id : ++ultimoId,
        titulo,
        id_autor,
        genero,
        editora,
        ano,
        faixaEtaria
       }

    books.push(newBook);   

    await bookPersistence.saveBooks(books);
    
    return newBook;

}

exports.getAllBooks = () => books;

exports.getBookById = (id) => books.find(books => books.id ===id);

exports.getBookAndAuthorById = (id) =>{

    const book = books.find(book => book.id === id);

    if (!book) {
        return null;
    }

    const autor = authors.find(author => author.id_autor === book.id_autor);

    const livroComAutor = {

        id : book.id,
        titulo: book.titulo,
        autor: autor.nome,
        nacionalidade: autor.nacionalidade,
        genero: book.genero,
        editora: book.editora,
        ano: book.ano,
        faixaEtaria: book.faixaEtaria
    }

    return livroComAutor;

}

exports.updateBook = async (titulo, id_autor, genero, editora, ano, faixaEtaria) =>{

    if (!authors.find(author => author.id_autor === id_autor)) {
        return null;
    }

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return null;
    }

    const updatedBook = {
        ...books[bookIndex],
        titulo: titulo ?? books[bookIndex].titulo,
        id_autor: id_autor ?? books[bookIndex].id_autor,
        genero: genero ?? books[bookIndex].genero,
        editora: editora ?? books[bookIndex].editora,
        ano: ano ?? books[bookIndex].ano,
        faixaEtaria: faixaEtaria ?? books[bookIndex].faixaEtaria
       }

    books[bookIndex] = updatedBook;  

    await bookPersistence.saveBooks(books);
    
    return updatedBook;

}

exports.deleteBook = async (id) => {

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return false;
    }

    authors.splice(bookIndex, 1);

   await authorPersistence.saveAuthors(authors);

   return true;
}