const { Router } = require("express");
const { VentaController } = require("../../controllers");

const router = Router();

router.get("/", VentaController.getAll);
router.get("/:id", VentaController.getById);
router.post("/", VentaController.create);

module.exports = router;
