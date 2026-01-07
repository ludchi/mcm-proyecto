const { body, validationResult } = require('express-validator');

const validarLote = [
  body('codigo').isLength({ min: 3, max: 50 }).trim().escape(),
  body('origen').isLength({ min: 2, max: 100 }).trim().escape(),
  body('tipoTueste').isIn(['Claro', 'Medio', 'Oscuro', 'Medio Oscuro']),
  body('peso').isFloat({ min: 0.1, max: 1000 }),
  body('fechaTueste').isISO8601(),
  body('fechaCaducidad').isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

const validarProducto = [
  body('nombre').isLength({ min: 2, max: 100 }).trim(),
  body('origen').isLength({ min: 2, max: 100 }).trim(),
  body('stockMinimo').isInt({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

const validarUsuario = [
  body('codigo').isLength({ min: 3, max: 50 }).trim(),
  body('nombre').isLength({ min: 2, max: 100 }).trim(),
  body('email').isEmail(),
  body('contrasena').isLength({ min: 6 }),
  body('rolId').isInt({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = { validarLote, validarProducto, validarUsuario };
