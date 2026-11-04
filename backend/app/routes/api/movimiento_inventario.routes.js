const { Router } = require("express");
const { MovimientoInventarioController } =
 require("../../controllers");

const router = Router();

router.get("/", MovimientoInventarioController.getAll);
router.get("/:id", MovimientoInventarioController.getById);
router.post("/", MovimientoInventarioController.create);

module.exports = router;

