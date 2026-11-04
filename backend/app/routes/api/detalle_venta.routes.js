const { Router } = require("express");
const { DetalleVentaController } = require("../../controllers");

const router = Router();

router.get("/", DetalleVentaController.getAll);
router.get("/:id", DetalleVentaController.getById);
router.post("/", DetalleVentaController.create);

module.exports = router;

