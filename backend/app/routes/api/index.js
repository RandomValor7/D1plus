const { Router } = require("express");

const router = Router();

router.use("/productos", require("./producto.routes"));
router.use("/roles", require("./rol.routes"));
router.use("/usuarios", require("./usuario.routes"));
router.use("/bodegas", require("./bodega.routes"));
router.use("/tiendas", require("./tienda.routes"));
router.use("/inventarios", require("./inventario.routes"));
router.use("/movimientos",
 require("./movimiento_inventario.routes"));

module.exports = router;
