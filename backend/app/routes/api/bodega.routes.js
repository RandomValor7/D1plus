const { Router } = require("express");
const { BodegaController } = require("../../controllers");

const router = Router();

router.get("/", BodegaController.getAll);
router.get("/:id", BodegaController.getById);
router.post("/", BodegaController.create);

module.exports = router;

