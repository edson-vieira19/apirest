const authorModel = require('../models/authorModel')


exports.getAllAuthors = () => authorModel.getAllAuthors();

exports.saveAuthor = (nome, nacionalidade) => authorModel.createAuthor(nome, nacionalidade);

exports.getAuthorById = (id) => authorModel.getAuthorById(id);