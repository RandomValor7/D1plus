const { Router } = require("express");

const router = Router();

router.use("/productos", require("./producto.routes"));

module.exports = router;
