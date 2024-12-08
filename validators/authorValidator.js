const { body, param, validationResult } = require('express-validator');

const validateAuthor = [

    body('nome')
        .notEmpty().withMessage('O nome é obrigatorio')
        .isLength({ min: 3, max: 100 }).withMessage('O nome deve ter entre 3 e 100 caracteres.'),
    body('nacionalidade')
        .notEmpty().withMessage('A nacionalidade do autor é obrigatoria')
        .isLength({ min: 3, max: 100 }).withMessage('a nacionalidade deve ter entre 3 e 100 caracteres.'),
        
        
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }    

];

const validateAuthorId = [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do autor deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];




module.exports = {validateAuthor, validateAuthorId};