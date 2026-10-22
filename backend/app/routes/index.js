const express = require('express');
const router = express.Router();

router.use('/', require('./home.routes'));
router.use('/', require('./auth.routes'));
router.use('/', require('./dashboard.routes'));
router.use('/', require('./usuarios.routes'));

module.exports = router;

