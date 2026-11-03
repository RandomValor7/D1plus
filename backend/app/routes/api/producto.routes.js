const { Router } = require("express");
const { ProductoController } = require("../../controllers");

const router = Router();

router.get("/", ProductoController.getAll);
router.get("/:id", ProductoController.getById);
router.post("/", ProductoController.create);

module.exports = router;

