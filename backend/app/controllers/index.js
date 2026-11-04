
module.exports = {

    ProductoController: require("./producto.controllers"),
    RolController: require("./rol.controllers"),
    UsuarioController: require("./usuario.controllers"),
    BodegaController: require("./bodega.controllers"),
    TiendaController: require("./tienda.controllers"),
    InventarioController: require("./inventario.controllers"),
    MovimientoInventarioController:
        require("./movimiento_inventario.controllers"),
    VentaController: require("./venta.controllers"),
    DetalleVentaController:
        require("./detalle_venta.controllers"),
    ProveedorController: require("./proveedor.controllers"),
    ProductoProveedorController:
        require("./producto_proveedor.controllers"),
    PedidoController: require("./pedido.controllers"),
    DetallePedidoController:
        require("./detalle_pedido.controllers"),

};
