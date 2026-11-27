const { Router } = require("express");

const {
    DashboardController,
    DevolucionController,
    InventarioController,
    MovimientoInventarioController,
    NotificacionController,
    PedidoController,
    ReporteController,
    VentaController
} = require("../../controllers");

const { autorizarRoles } =
    require("../../middlewares/auth.middleware");
const { OPERACIONES } = require("../../config/permisos");

const router = Router();

const { vender, pedir, despachar, inventario, devoluciones,
    reportes, alertas } = OPERACIONES;
// Ventas (RF13)
router.post("/ventas/registrar", autorizarRoles(vender),
    VentaController.registrar);

module.exports = router;