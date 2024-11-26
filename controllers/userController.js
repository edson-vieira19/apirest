const userService = require('../services/userService');


exports.getAllUsers = (req, res) => {
    const users = userService.getAllUsers();
  
    res.status(200).json(users);
  };
  
