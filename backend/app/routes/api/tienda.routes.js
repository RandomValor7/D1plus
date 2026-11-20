const { Router } = require("express");
const { TiendaController } = require("../../controllers");

const router = Router();

router.get("/", TiendaController.getAll);
router.get("/:id", TiendaController.getById);
router.post("/", TiendaController.create);
router.put("/:id", TiendaController.update);
router.delete("/:id", TiendaController.remove);

module.exports = router;
