const { Router } = require("express");
const { PedidoController } = require("../../controllers");

const router = Router();

router.get("/", PedidoController.getAll);
router.get("/:id", PedidoController.getById);
router.post("/", PedidoController.create);

module.exports = router;
