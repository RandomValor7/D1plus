const { Router } = require("express");
const { ProductoProveedorController } =
 require("../../controllers");

const router = Router();

router.get("/", ProductoProveedorController.getAll);
router.get("/:id", ProductoProveedorController.getById);
router.post("/", ProductoProveedorController.create);

module.exports = router;

