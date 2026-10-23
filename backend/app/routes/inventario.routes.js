const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/inventario_general',
 enviarPantalla('08_inventario_general.html'));

router.get('/registrar_entrada',
 enviarPantalla('09_registrar_entrada.html'));

router.get('/registrar_salida',
 enviarPantalla('10_registrar_salida.html'));

router.get('/actualizar_inventario',
 enviarPantalla('11_actualizar_inventario.html'));

router.get('/productos_vencidos',
 enviarPantalla('12_productos_vencidos.html'));

router.get('/baja_rotacion',
 enviarPantalla('13_baja_rotacion.html'));

module.exports = router;
