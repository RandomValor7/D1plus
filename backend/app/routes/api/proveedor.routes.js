const { Router } = require("express");
const { ProveedorController } = require("../../controllers");

const router = Router();

router.get("/", ProveedorController.getAll);
router.get("/:id", ProveedorController.getById);
router.post("/", ProveedorController.create);

module.exports = router;
