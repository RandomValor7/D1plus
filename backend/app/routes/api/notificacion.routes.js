const { Router } = require("express");
const { NotificacionController } = require("../../controllers");

const router = Router();

router.get("/", NotificacionController.getAll);
router.get("/:id", NotificacionController.getById);
router.post("/", NotificacionController.create);

module.exports = router;

