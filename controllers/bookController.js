const bookService = require('../services/bookService');


exports.getAllBooks = (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.description = 'retorna todos os livros'
    const books = bookService.getAllBooks();
  
    res.status(200).json(books);
  };

exports.createBook = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.description = 'salva um novo livro'
    const {titulo, id_autor, genero, editora, ano, faixaEtaria} = req.body;

    const newBook = await bookService.createBook(titulo, id_autor, genero, editora, ano, faixaEtaria);

    if(newBook){
    res.status(201).json(newBook);
    }
    else{
      res.status(500).json({ message: "Erro ao criar o livro, autor invalido"});
    }
    
}  

exports.getBookById = (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.description = 'retorna um livro pelo id'
  const book = bookService.getBookById(parseInt(req.params.id, 10));

  if (!book) {
    return res.status(404).json({ message: "Livro não encontrado." });
  }

  res.status(200).json(book);
};

exports.updateBook = async (req, res) =>{
  // #swagger.tags = ['Books']
  // #swagger.description = 'atualiza um livro'
  const { id } = req.params;
  const {titulo, id_autor, genero, editora, ano, faixaEtaria} = req.body;

  const updatedBook = await bookService.updateBook(
    parseInt(id, 10),
    titulo,
    id_autor,
    genero,
    editora,
    ano,
    faixaEtaria
  );

  if(!updatedBook){
    return res.status(404).json({ message: "livro não encontrado." });
  }

  res.status(200).json(updatedBook);

}

exports.deleteBook = async (req, res)=> {
  // #swagger.tags = ['Books']
  // #swagger.description = 'exclui um livro'
  const { id } = req.params;

  const isDeleted = await bookService.deleteBook(parseInt(id, 10));

  if (!isDeleted) {
    return res.status(404).json({ message: "Autor não encontrado." });
  }

  res.status(200).json({ message: "Livro excluído com sucesso." });



}