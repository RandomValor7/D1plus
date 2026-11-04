const { Router } = require("express");
const { DetallePedidoController } = require("../../controllers");

const router = Router();

router.get("/", DetallePedidoController.getAll);
router.get("/:id", DetallePedidoController.getById);
router.post("/", DetallePedidoController.create);

module.exports = router;

