const express = require('express');
const enviarPantalla = require('../utils/enviarPantalla');
const router = express.Router();

router.get('/dashboard',
 enviarPantalla('05_dashboard.html'));
 
module.exports = router;
