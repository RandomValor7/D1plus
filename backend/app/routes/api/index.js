const { Router } = require("express");
const { verificarToken, permitir } =
    require("../../middlewares/auth.middleware");
const { auditar } = require("../../middlewares/auditoria.middleware");
const { ACCESO } = require("../../config/permisos");
const router = Router();
// Login: es publico. /auth/me se protege dentro de auth.routes
router.use("/auth", require("./auth.routes"));
// Desde aqui, todo exige token valido y el rol correcto
router.use(verificarToken);
router.use(auditar);
// Operaciones de negocio
router.use(require("./operaciones.routes"));
router.use("/productos", permitir(ACCESO.productos),
    require("./producto.routes"));
router.use("/roles", permitir(ACCESO.roles),
    require("./rol.routes"));
router.use("/usuarios", permitir(ACCESO.usuarios),
    require("./usuario.routes"));
router.use("/bodegas", permitir(ACCESO.bodegas),
    require("./bodega.routes"));
router.use("/tiendas", permitir(ACCESO.tiendas),
    require("./tienda.routes"));
router.use("/inventarios", permitir(ACCESO.inventarios),
    require("./inventario.routes"));
router.use("/movimientos", permitir(ACCESO.movimientos),
    require("./movimiento_inventario.routes"));
router.use("/ventas", permitir(ACCESO.ventas),
    require("./venta.routes"));
router.use("/detalle-ventas", permitir(ACCESO.detalleVentas),
    require("./detalle_venta.routes"));
router.use("/proveedores", permitir(ACCESO.proveedores),
    require("./proveedor.routes"));
router.use("/producto-proveedor", permitir(ACCESO.productoProveedor),
    require("./producto_proveedor.routes"));
router.use("/pedidos", permitir(ACCESO.pedidos),
    require("./pedido.routes"));
router.use("/detalle-pedidos", permitir(ACCESO.detallePedidos),
    require("./detalle_pedido.routes"));
router.use("/notificaciones", permitir(ACCESO.notificaciones),
    require("./notificacion.routes"));
router.use("/auditorias", permitir(ACCESO.auditorias),
    require("./auditoria.routes"));

module.exports = router;
