const express = require('express');
const router = express.Router();

router.use('/', require('./home.routes'));
router.use('/', require('./auth.routes'));
router.use('/', require('./dashboard.routes'));
router.use('/', require('./usuarios.routes'));
router.use('/', require('./inventario.routes'));
router.use('/', require('./ventas.routes'));

module.exports = router;

