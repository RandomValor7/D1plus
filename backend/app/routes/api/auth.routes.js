// login es público; me exige token.
const { Router } = require("express");
const { AuthController } = require("../../controllers");
const { verificarToken } =
    require("../../middlewares/auth.middleware");

const router = Router();

router.post("/login", AuthController.login);
router.get("/me", verificarToken, AuthController.me);
router.post("/recuperar", AuthController.recuperar);
router.post("/restablecer", AuthController.restablecer);

module.exports = router;
