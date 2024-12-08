const authorService = require('../services/authorService')

exports.getAllAuthors = (req, res) => {

    const authors = authorService.getAllAuthors();
  
    res.status(200).json(authors);
  };


exports.saveAuthor = async (req, res) => {

    const {nome, nacionalidade} = req.body;

    const newAuthor = await authorService.saveAuthor(nome, nacionalidade);

    res.status(201).json(newAuthor);
} 

exports.getAuthorById = (req, res) => {

    const author = authorService.getAuthorById(parseInt(req.params.id, 10));

    if (!author) {
      return res.status(404).json({ message: "Autor não encontrado." });
    }

    res.status(200).json(author);

}