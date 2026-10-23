const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/panel_de_reportes',
 enviarPantalla('26_panel_de_reportes.html'));

router.get('/reporte_de_ventas',
 enviarPantalla('27_reporte_de_ventas.html'));

router.get('/reporte_de_pedidos',
 enviarPantalla('28_reporte_de_pedidos.html'));

router.get('/rotacion_de_productos',
 enviarPantalla('29_rotacion_de_productos.html'));

router.get('/productos_agotados',
 enviarPantalla('30_productos_agotados.html'));

router.get('/reporte_inventario_tiempo_real',
 enviarPantalla('36_reporte_inventario_tiempo_real.html'));
 
module.exports = router;
