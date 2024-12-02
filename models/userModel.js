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







