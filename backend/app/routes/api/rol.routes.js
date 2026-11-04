const { Router } = require("express");
const { RolController } = require("../../controllers");

const router = Router();

router.get("/", RolController.getAll);
router.get("/:id", RolController.getById);
router.post("/", RolController.create);

module.exports = router;
