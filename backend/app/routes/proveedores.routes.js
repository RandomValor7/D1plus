const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/listado_proveedores',
 enviarPantalla('22_listado_proveedores.html'));

router.get('/registrar_proveedor',
 enviarPantalla('23_registrar_proveedor.html'));

router.get('/asociar_productos',
 enviarPantalla('24_asociar_productos.html'));

router.get('/devolucion_proveedor',
 enviarPantalla('25_devolucion_proveedor.html'));
 
module.exports = router;
