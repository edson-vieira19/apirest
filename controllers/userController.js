const userService = require('../services/userService');


exports.getAllUsers = (req, res) => {
    const users = userService.getAllUsers();
  
    res.status(200).json(users);
  };
  

  exports.saveUser = async (req, res) => {

    const { nome, senha, email, idade, genero } = req.body;
    
    const newUser = await userService.saveUser( nome, senha, email, idade, genero );
    

    res.status(201).json(newUser);
  };