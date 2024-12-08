const authorPersistence = require("../persistencia/authorPersistence");

let authors = [];
let ultimoId = 0;

const initAuthors = async () => {
  authors = await authorPersistence.loadAuthors();
  ultimoId = authors.length > 0 ? authors[authors.length - 1].id : 0;
};

initAuthors();

exports.createAuthor = async (nome, nacionalidade) => {
  const newAuthor = {
    id: ++ultimoId,
    nome,
    nacionalidade,
  };

  authors.push(newAuthor);

  authorPersistence.saveAuthors(authors);

  return newAuthor;
};

exports.getAllAuthors = () => authors;

exports.getAuthorById = (id) => authors.find((author) => author.id === id);

exports.getAuthorsByNacionalidade = (nacionalidade) => {

  return authors.filter((author) => author.nacionalidade === nacionalidade);
};

exports.updateAuthor = async (id, nome, nacionalidade) => {
  
  const authorIndex = authors.findIndex((author) => author.id === id);

  if (authorIndex === -1) {
    return null;
  }

  const updatedAuthor = {
    ...authors[authorIndex],
    nome: nome ?? authors[authorIndex].nome,
    nacionalidade: nacionalidade ?? authors[authorIndex].nacionalidade,
  };

  authors[authorIndex] = updatedAuthor;

  await authorPersistence.saveAuthors(authors);

  return updatedAuthor;
};

exports.deleteAuthor = async (id) => {
  const authorIndex = authors.findIndex((author) => author.id === id);

  if (userIndex === -1) {
    return false;
  }

  authors.splice(authorIndex, 1);

  await authorPersistence.saveAuthors(authors);

  return true;
};
