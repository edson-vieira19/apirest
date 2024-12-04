const userService = require("../services/userService");

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
  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, senha, email, idade, genero } = req.body;

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