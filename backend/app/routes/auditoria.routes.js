const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/registro_de_auditoria',
 enviarPantalla('32_registro_de_auditoria.html'));

router.get('/historial_de_cambios',
 enviarPantalla('33_historial_de_cambios.html'));
 
module.exports = router;