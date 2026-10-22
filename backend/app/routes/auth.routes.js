const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/login',
 enviarPantalla('01_login.html'));

router.get('/registro',
 enviarPantalla('02_registro.html'));

router.get('/recuperar_contrasena',
 enviarPantalla('03_recuperar_contrasena.html'));

router.get('/restablecer_contrasena',
 enviarPantalla('04_restablecer_contrasena.html'));
 
module.exports = router;
