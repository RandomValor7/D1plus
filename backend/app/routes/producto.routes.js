import { Router } from "express";
import { ProductoController } from "../controllers/index.js";

const router = Router();

router.get("/", ProductoController.getAll);
router.get("/:id", ProductoController.getById);
router.post("/", ProductoController.create);

export default router;