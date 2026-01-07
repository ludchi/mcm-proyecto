const express = require('express');
const { login, perfil } = require('../controllers/authController');
const { verificarJWT } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/perfil', verificarJWT, perfil);

module.exports = router;
