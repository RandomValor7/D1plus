const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/notificaciones',
 enviarPantalla('31_notificaciones.html'));
 
module.exports = router;