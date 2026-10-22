const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/listado_pedidos',
 enviarPantalla('16_listado_pedidos.html'));

router.get('/generar_pedido',
 enviarPantalla('17_generar_pedido.html'));

router.get('/editar_pedido',
 enviarPantalla('18_editar_pedido.html'));

router.get('/aprobar_pedido',
 enviarPantalla('19_aprobar_pedido.html'));

router.get('/registrar_despacho',
 enviarPantalla('20_registrar_despacho.html'));

router.get('/confirmar_recepcion',
 enviarPantalla('21_confirmar_recepcion.html'));
 
module.exports = router;
