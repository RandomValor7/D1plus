const express = require('express');
const router = express.Router();

router.use('/', require('./home.routes'));
router.use('/', require('./auth.routes'));
router.use('/', require('./dashboard.routes'));
router.use('/', require('./usuarios.routes'));
router.use('/', require('./inventario.routes'));
router.use('/', require('./ventas.routes'));
router.use('/', require('./pedidos.routes'));
router.use('/', require('./proveedores.routes'));
router.use('/', require('./reportes.routes'));
router.use('/', require('./notificaciones.routes'));
router.use('/', require('./auditoria.routes'));
router.use('/', require('./modales.routes'));

module.exports = router;

