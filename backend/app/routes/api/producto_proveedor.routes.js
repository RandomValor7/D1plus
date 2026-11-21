const { Router } = require("express");
const { ProductoProveedorController } =
    require("../../controllers");

const router = Router();

router.get("/", ProductoProveedorController.getAll);
router.get("/:id", ProductoProveedorController.getById);
router.post("/", ProductoProveedorController.create);
router.put("/:id", ProductoProveedorController.update);
router.delete("/:id", ProductoProveedorController.remove);

module.exports = router;

