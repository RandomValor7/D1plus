const { Router } = require("express");
const { UsuarioController } = require("../../controllers");

const router = Router();

router.get("/", UsuarioController.getAll);
router.get("/:id", UsuarioController.getById);
router.post("/", UsuarioController.create);

module.exports = router;

