const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/listado_usuarios',
 enviarPantalla('06_listado_usuarios.html'));

router.get('/roles_y_permisos',
 enviarPantalla('07_roles_y_permisos.html'));

router.get('/crear_editar_usuario',
 enviarPantalla('34_crear_editar_usuario.html'));

router.get('/crear_editar_rol',
 enviarPantalla('35_crear_editar_rol.html'));
 
module.exports = router;
