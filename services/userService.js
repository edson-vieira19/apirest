const userModel = require('../models/userModel');


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