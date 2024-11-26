const userPersitence = require('../persistencia/userPersistence');
const bcrypt = require('bcrypt');

let users = await userPersitence.loadUsers();

let ultimoId = users.length > 0 ? users[users.length - 1].id : 0;

exports.createUser = (user) => {
    const newUser = { id, ...user };



    
    users.push(newUser);

    id = ++ultimoId;

    return newUser;
};









