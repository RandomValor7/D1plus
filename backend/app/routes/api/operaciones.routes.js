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
// Inventario (RF06 a RF10 y RF38)
router.get("/inventarios/detalle", InventarioController.detalle);
router.post("/movimientos/entrada", autorizarRoles(inventario),
    MovimientoInventarioController.entrada);
router.post("/movimientos/salida", autorizarRoles(inventario),
    MovimientoInventarioController.salida);
router.post("/movimientos/ajuste", autorizarRoles(inventario),
    MovimientoInventarioController.ajuste);
router.get("/movimientos/historial", autorizarRoles(inventario),
    MovimientoInventarioController.historial);

module.exports = router;

