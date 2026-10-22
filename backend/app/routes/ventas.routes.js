const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/registrar_venta',
 enviarPantalla('14_registrar_venta.html'));

router.get('/historial_ventas',
 enviarPantalla('15_historial_ventas.html'));
 
module.exports = router;