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
// Pedidos (RF16 a RF20)
router.post("/pedidos/crear", autorizarRoles(pedir),
    PedidoController.crear);
router.put("/pedidos/:id/lineas", autorizarRoles(pedir),
    PedidoController.editar);
router.patch("/pedidos/:id/aprobar", autorizarRoles(despachar),
    PedidoController.aprobar);
router.patch("/pedidos/:id/rechazar", autorizarRoles(despachar),
    PedidoController.rechazar);
router.patch("/pedidos/:id/despachar", autorizarRoles(despachar),
    PedidoController.despachar);
router.patch("/pedidos/:id/recibir", autorizarRoles(pedir),
    PedidoController.recibir);

module.exports = router;

