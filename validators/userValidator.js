const { body, param, validationResult } = require('express-validator');

const validateUser = [
    body('nome')
        .notEmpty().withMessage('O nome é obrigatorio')
        .isLength({ min: 3, max: 100 }).withMessage('O nome deve ter entre 3 e 100 caracteres.'),
    body('senha')
        .notEmpty().withMessage('a seha é obrigatoria')
        .isLength({ min: 3, max: 50 }).withMessage('a senha deve ter entre 3 e 50 caracteres'),
    body('email')
        .notEmpty().withMessage('O email é obrigatório.')
        .isEmail().withMessage('O email deve ser válido.'),
    body('idade')
        .notEmpty().withMessage('A idade é obrigatória.')
        .isInt({ min: 0, max: 150 }).withMessage('A idade deve ser um número inteiro entre 0 e 150.'),
    body('genero')
        .notEmpty().withMessage('O gênero é obrigatório.')
        .isIn(['masculino', 'feminino']).withMessage('O gênero deve ser "masculino" ou "feminino"'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserId = [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do usuario deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];


module.exports = {validateUser, validateUserId};