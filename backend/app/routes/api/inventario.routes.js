const { Router } = require("express");
const { InventarioController } = require("../../controllers");

const router = Router();

router.get("/", InventarioController.getAll);
router.get("/:id", InventarioController.getById);
router.post("/", InventarioController.create);

module.exports = router;
