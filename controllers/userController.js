const userService = require("../services/userService");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.status(200).json(users);
};

exports.saveUser = async (req, res) => {
  const { nome, senha, email, idade, genero } = req.body;

  const newUser = await userService.saveUser(nome, senha, email, idade, genero);

  res.status(201).json(newUser);
};

exports.getUserById = (req, res) => {
  const user = userService.getUserById(parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ message: "Usuario não encontrado." });
  }

  if (req.user.role !== 'admin' && parseInt(id, 10) !== req.user.id) {
    return res.status(403).json({ message: "Você não pode acessar os dados deste usuário." });
  }

  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, senha, email, idade, genero } = req.body;

  if (req.user.role !== 'admin' && parseInt(id, 10) !== req.user.id) {
    return res.status(403).json({ message: "Você não tem permissão para alterar os dados deste usuário." });
  }

  try {
    const updatedUser = await userService.updateUser(
      parseInt(id, 10),
      nome,
      senha,
      email,
      idade,
      genero
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o usuário.", error });
  }
};

exports.deleteUser = async (req, res) => {

  const { id } = req.params;

  try {
    const isDeleted = await userService.deleteUser(parseInt(id, 10));

    if (!isDeleted) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o usuário.", error });
  }
};

exports.login = async(req, res) => {

  const {email,senha} = req.body;

    try {
    const user = userService.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.SECRET , {
        expiresIn: '1h',
    });

    res.status(200).json({ message: "Login bem-sucedido.", token });
  } catch (error) {
      res.status(500).json({ message: "Erro no login.", error });
 }

}

exports.installAdmin = async (req, res) => {

  try{
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const existingAdmin = userService.getUserByEmail(adminEmail);
        if (existingAdmin) {
            return res.status(400).json({ message: "Administrador já existe." });
        }

        const adminUser = await userService.createAdmin(adminEmail, adminPassword);


        res.status(201).json({ message: "Administrador criado com sucesso.", admin: adminUser });
      } catch (error) {
          res.status(500).json({ message: "Erro ao criar administrador.", error });
      }      

}

exports.createAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
      const existingAdmin = userService.getUserByEmail(email);
      if (existingAdmin) {
          return res.status(400).json({ message: "Administrador já existe." });
      }

      const newAdmin = await userService.createAdmin(email, senha);

      res.status(201).json({ message: "Novo administrador criado com sucesso.", admin: newAdmin });
  } catch (error) {
      res.status(500).json({ message: "Erro ao criar administrador.", error });
  }
};
