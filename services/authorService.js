const authorModel = require('../models/authorModel')


exports.getAllAuthors = () => authorModel.getAllAuthors();

exports.saveAuthor = (nome, nacionalidade) => authorModel.createAuthor(nome, nacionalidade);

exports.getAuthorById = (id) => authorModel.getAuthorById(id);

exports.updateAuthor = async (id, nome, nacionalidade) => {
  return await authorModel.updateAuthor(id, nome, nacionalidade);
};

exports.deleteAutor = async (id) =>{
    return await authorModel.deleteAuthor(id);
}