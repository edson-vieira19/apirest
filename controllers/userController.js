const userService = require("../services/userService");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.getAllUsers = (req, res) => {
/* #swagger.tags = ['Users']
  #swagger.description = 'retorna todos os usuários (requer privilegios de administrador)'
  #swagger.security = [{ "bearerAuth": [] }]
*/     

  const users = userService.getAllUsers();

  res.status(200).json(users);
};

exports.saveUser = async (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.description = 'cria um novo usuario / faz o sign in na aplicação'
    #swagger.parameters['user'] = {
    in: 'body',
    description: 'Informações do usuário',
    required: true,
    schema: { $ref: '#/components/schemas/User' }
    } */
  const { nome, senha, email, idade, genero } = req.body;

  const newUser = await userService.saveUser(nome, senha, email, idade, genero);

  res.status(201).json(newUser);
};

exports.getUserById = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'retorna um usuario pelo id'
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
  // #swagger.tags = ['Users']
  // #swagger.description = 'atualiza um usuario (requer privilegios de administrador)'
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
  // #swagger.tags = ['Users']
  // #swagger.description = 'exclui um usuario pelo id (requer privilegios de administrador)'
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
  // #swagger.tags = ['Login']
  // #swagger.description = 'faz login na aplicação'
  const {email,senha} = req.body;

    try {
    const user = userService.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ message: "Credenciais email inválidas." });
    }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais senha inválidas." });
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
  // #swagger.tags = ['Admin']
  // #swagger.description = 'instala um administrador inicial'
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
  // #swagger.tags = ['Admin']
  // #swagger.description = 'permite administradores a criar um novo administrador'
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


exports.adicionarLivroALista = async (req, res) =>{
// #swagger.tags = ['Listar Livros']  
// #swagger.description = 'um usuario pode adicionar livros a lista de leitura'
  const { id } = req.params; //id do usuario
  const { id_livro } = req.body;

  if (parseInt(id, 10) !== req.user.id) {
    return res.status(403).json({ message: "Você não tem permissão para alterar os dados deste usuário."});
  }

  try {
    const updatedUser = await userService.adicionarLivroALista(
      parseInt(id, 10),
      id_livro
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o usuário.", error });
  }

}

exports.minhaLista = async (req, res) =>{
    // #swagger.tags = ['Listar Livros'] 
    // #swagger.description = 'retorna a lista de leitura do usuario'
  const { id } = req.params; //id do usuario

  if (parseInt(id, 10) !== req.user.id) {
    return res.status(403).json({ message: "Você não tem permissão para visualizar os dados deste usuário."});
  }

   try {
    const lista = await userService.minhaLista(
      parseInt(id, 10),
    );

    res.status(200).json(lista);

    } catch (error) {
     res.status(500).json({ message: "Erro ao visualizar lista.", error });
   }
  
}