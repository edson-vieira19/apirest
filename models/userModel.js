const userPersistence = require('../persistencia/userPersistence');
const bcrypt = require('bcrypt');

let users = [];
let ultimoId = 0;

const initUsers = async () => {
    users = await userPersistence.loadUsers();
    ultimoId = users.length > 0 ? users[users.length - 1].id : 0;
};

initUsers();

(async () => {
   
    ultimoId = users.length > 0 ? users[users.length - 1].id : 0;
})();

exports.createUser = async (nome, senha, email, idade, genero) => {

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = {
        id : ++ultimoId,
        nome,
        senha: hashedPassword,
        email,
        idade,
        genero,
        lista_de_leitura:[]
        };
  
    users.push(newUser);

    userPersistence.saveUsers(users);

    return newUser;
};

exports.getAllUsers = () => users;

exports.getUserById = (id) => users.find(user => user.id === id);

exports.getUserByEmail = (email) => users.find((user) => user.email === email);

exports.updateUser = async (id, nome, senha, email, idade, genero) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const updatedUser = {
    ...users[userIndex],
    nome: nome ?? users[userIndex].nome,
    senha: senha ? await bcrypt.hash(senha, 10) : users[userIndex].senha,
    email: email ?? users[userIndex].email,
    idade: idade ?? users[userIndex].idade,
    genero: genero ?? users[userIndex].genero,
  };

  users[userIndex] = updatedUser;

  await userPersistence.saveUsers(users);

  return updatedUser;
};

exports.deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);
  await userPersistence.saveUsers(users);

  return true;
};


