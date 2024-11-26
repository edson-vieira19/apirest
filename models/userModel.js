const userPersistence = require('../persistencia/userPersistence');
const bcrypt = require('bcrypt');

let users = []; // userPersitence.loadUsers();

(async () => {
    users = await userPersistence.loadUsers(); 
})();

let ultimoId = 0; // users.length > 0 ? users[users.length - 1].id : 0;

(async () => {
    //const loadedUsers = await userPersistence.loadUsers();
    ultimoId = users.length > 0 ? users[users.length - 1].id : 0;
})();

exports.createUser = async (nome, senha, email, idade, genero) => {

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = {
        id : ++ultimoId,
        senha: hashedPassword,
        email,
        idade,
        genero,
        lista_de_leitura:[]
        };
  
    users.push(newUser);

    userPersitence.saveUsers(users);

    return newUser;
};

exports.getAllUsers = () => users;







