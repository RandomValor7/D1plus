const { Router } = require("express");
const { ProveedorController } = require("../../controllers");

const router = Router();

router.get("/", ProveedorController.getAll);
router.get("/:id", ProveedorController.getById);
router.post("/", ProveedorController.create);
router.put("/:id", ProveedorController.update);
router.delete("/:id", ProveedorController.remove);

module.exports = router;
