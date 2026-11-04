const { Router } = require("express");
const { AuditoriaController } = require("../../controllers");

const router = Router();

router.get("/", AuditoriaController.getAll);
router.get("/:id", AuditoriaController.getById);
router.post("/", AuditoriaController.create);

module.exports = router;
