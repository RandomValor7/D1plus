const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/modal_confirmar_eliminacion',
 enviarPantalla('modal_confirmar_eliminacion.html'));

router.get('/modal_error',
 enviarPantalla('modal_error.html'));

router.get('/modal_exportar_reporte',
 enviarPantalla('modal_exportar_reporte.html'));

router.get('/modal_operacion_exitosa',
 enviarPantalla('modal_operacion_exitosa.html'));

router.get('/modal_sesion_expirada',
 enviarPantalla('modal_sesion_expirada.html'));
 
module.exports = router;
