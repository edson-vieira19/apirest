const authorPersistence = require('../persistencia/authorPersistence');

let authors = [];
let ultimoId = 0;


const initAuthors = async () => {
    users = await authorPersistence.loadAuthors();
    ultimoId = authors.length > 0 ? authors[authors.length - 1].id : 0;
};

initAuthors();




