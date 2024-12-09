const { body, param, validationResult } = require('express-validator');

const generos = [
    "terror",
    "ficção", 
    "romance",
    "açao", 
    "aventura", 
    "fantasia", 
    "didático", 
    "religioso", 
    "poesia", 
    "outro"
]

const faixaEtaria = ["infantil", "juvenil", "adulto", "livre"];

const validateBookId = [
    param("id")
      .isInt({ min: 1 })
      .withMessage("O ID do livro deve ser um inteiro positivo."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  const validateBook = [

    body('titulo')
        .notEmpty().withMessage('O titulo do livro é obrigatório')
        .isLength({ min: 3, max: 100 }).withMessage('O nome deve ter entre 3 e 100 caracteres.'),
    body('id_autor')
        .notEmpty().withMessage('informe o id do autor do livro')
        .isInt({ min: 1 }),
    body('genero')
        .notEmpty().withMessage('O gênero do livro é obrigatório.')
        .isIn(generos).withMessage(`O gênero deve ser um dos seguintes: ${generos.join(", ")}.`), 
    body('editora')
        .notEmpty().withMessage('A editora do livro é obrigatória.')
        .isLength({ min: 3, max: 50 }).withMessage('O nome da editora deve ter entre 3 e 50 caracteres.'),
    body('ano')
        .notEmpty().withMessage('O ano de publicação do livro é obrigatório.')
        .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage(`O ano deve ser entre 1000 e ${new Date().getFullYear()}.`),
    body('faixaEtaria')
        .notEmpty().withMessage('A faixa etária do livro é obrigatória.')
        .isIn(faixaEtaria).withMessage(`A faixa etária deve ser uma das seguintes: ${faixaEtaria.join(", ")}.`),
            
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },

  ];

  const validateUpdateBook = [

    body('titulo')
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage('O nome deve ter entre 3 e 100 caracteres.'),
    body('id_autor')
        .optional()
        .isInt({ min: 1 }),
    body('genero')
        .optional()
        .isIn(generos).withMessage(`O gênero deve ser um dos seguintes: ${generos.join(", ")}.`), 
    body('editora')
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage('O nome da editora deve ter entre 3 e 50 caracteres.'),
    body('ano')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage(`O ano deve ser entre 1000 e ${new Date().getFullYear()}.`),
    body('faixaEtaria')
        .optional()
        .isIn(faixaEtaria).withMessage(`A faixa etária deve ser uma das seguintes: ${faixaEtaria.join(", ")}.`),
            
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },

  ];

  module.exports = {validateBookId, validateBook, validateUpdateBook};