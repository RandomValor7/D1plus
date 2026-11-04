const { Router } = require("express");

const router = Router();

router.use("/productos", require("./producto.routes"));
router.use("/roles", require("./rol.routes"));
router.use("/usuarios", require("./usuario.routes"));

module.exports = router;
