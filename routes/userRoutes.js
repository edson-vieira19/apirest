const { validateUser, validateUserId, validateUpdateUser } = require('../validators/userValidator');
const { authenticateUser, verifyAdmin } = require('../middlewares/userAuth');

const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');

// para ver todo os dados de usuarios somente o administrador ou editar/excluir o dado de qualquer usuario
// o usuario so pode ver/editar os dados dele mesmo

userRoutes.get('/users',verifyAdmin ,userController.getAllUsers);
userRoutes.post('/users', validateUser, userController.saveUser);
userRoutes.get('/users/:id', validateUserId,authenticateUser ,userController.getUserById);
userRoutes.put('/users/:id', validateUserId,authenticateUser, validateUpdateUser, userController.updateUser);
userRoutes.delete('/users/:id', validateUserId, verifyAdmin, userController.deleteUser);

userRoutes.post('/login', userController.login);


//rotas para gerar um admnistrador inicial , e para criar outros administradores

userRoutes.post('/install', userController.installAdmin);
userRoutes.post('/createAdmin',verifyAdmin, userController.createAdmin);


//rotas para adicionar/recuperar livros da lista de leitura

userRoutes.post('/users/:id/adicionar-livros', authenticateUser, validateUserId, userController.adicionarLivroALista);
userRoutes.get('/users/:id/minha-lista', authenticateUser, validateUserId, userController.minhaLista);




module.exports = userRoutes;