const userModel = require('../models/userModel');
const bookModel = require('../models/bookModel');

exports.getAllUsers = () => userModel.getAllUsers();

exports.saveUser = async (nome, senha, email, idade, genero) => 
    await userModel.createUser(nome, senha, email, idade, genero);

exports.getUserById = (id) => userModel.getUserById(id);

exports.updateUser = async (id, nome, senha, email, idade, genero) =>{
    
    return await userModel.updateUser(id, nome, senha, email, idade, genero);

}

exports.getUserByEmail = (email) => userModel.getUserByEmail(email);
    
exports.deleteUser = async (id) => {
    return await userModel.deleteUser(id);
};

exports.createAdmin = async (adminEmail, adminPassword) =>{
    return await userModel.createAdmin(adminEmail, adminPassword);
}

exports.getAdmins = () => {
    return userModel.getAllUsers().filter(user => user.role === 'admin');
};


exports.adicionarLivroALista = async (id_user, id_book) => {
  const user = userModel.getUserById(id_user);

  const book = bookModel.getBookById(id_book);

  if (!book) {
    return null;
  }

  user.lista_de_leitura.push(book);

  updatedUser = await userModel.updateUser(
    user.id,
    user.nome,
    user.senha,
    user.email,
    user.idade,
    user.genero,
    user.lista_de_leitura
  );

  return updatedUser;
}; 

exports.minhaLista = async (id) => {

    const user = await userModel.getUserById(id);

    const lista = user.lista_de_leitura;

    return lista;

}