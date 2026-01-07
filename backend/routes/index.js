const express = require('express');
const authRoutes = require('./auth');
const lotesRoutes = require('./lotes');
const productosRoutes = require('./productos');
const usuariosRoutes = require('./usuarios');
const etiquetasRoutes = require('./etiquetas');
const reportesRoutes = require('./reportes');
const alertasRoutes = require('./alertas');
const dashboardRoutes = require('./dashboard');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/lotes', lotesRoutes);
router.use('/productos', productosRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/etiquetas', etiquetasRoutes);
router.use('/reportes', reportesRoutes);
router.use('/alertas', alertasRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/docs', (req, res) => {
  res.json({
    version: '1.0.0',
    endpoints: 'Available at /api/v1'
  });
});

module.exports = router;
