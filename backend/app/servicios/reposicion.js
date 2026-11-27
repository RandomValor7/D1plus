const db = require("../config/db");
const { PedidoModel } = require("../models");
const reglas = require("../config/reglas");
const alertas = require("./alertas");

// RF15: si el producto llego al stock minimo y tiene proveedor, crea
// un pedido automatico (uno solo mientras siga Pendiente)
const crearPedidoAutomatico = async (idProducto, idUsuario) => {
    const [productos] = await db.query(
        `SELECT stock, stock_minimo, estado FROM producto
 WHERE id_producto = ?`,
        [idProducto]
    );
    const p = productos[0];
    if (!p || p.estado !== 1 || p.stock > p.stock_minimo) {
        return null;
    }
    const cantidad = p.stock_minimo * reglas.MULTIPLO_REPOSICION - p.stock;
    if (cantidad <= 0) {
        return null;
    }
    const [proveedores] = await db.query(
        `SELECT id_proveedor FROM producto_proveedor
 WHERE id_producto = ? ORDER BY id_producto_proveedor LIMIT 1`,
        [idProducto]
    );
    if (proveedores.length === 0) {
        return null;
    }
    const [abiertos] = await db.query(
        `SELECT p.id_pedido FROM pedido p
 JOIN detalle_pedido d ON d.id_pedido = p.id_pedido
 WHERE p.estado = 'Pendiente' AND p.tipo_pedido = 'Automatico'
 AND d.id_producto = ?`,
        [idProducto]
    );
    if (abiertos.length > 0) {
        return null;
    }
    return PedidoModel.crearConLineas({
        id_usuario: idUsuario,
        id_proveedor: proveedores[0].id_proveedor,
        tipo_pedido: "Automatico",
        lineas: [{ id_producto: idProducto, cantidad }]
    });
};

// Se llama cuando baja el stock de un producto: alerta y pedido
const revisarProducto = async (idProducto, idUsuario) => {
    await alertas.alertaStockBajo(idProducto);
    return crearPedidoAutomatico(idProducto, idUsuario);
};

module.exports = { revisarProducto };

