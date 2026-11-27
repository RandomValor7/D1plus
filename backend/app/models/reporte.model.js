const db = require("../config/db");

// Reporte ventas completadas entre dos fechas (RF24) 
const ventas = async (desde, hasta) => {
    const [filas] = await db.query(
        `SELECT id_venta, fecha_venta, total FROM venta
 WHERE estado = 'Completada'
 AND fecha_venta >= ? AND fecha_venta < ?`,
        [desde, hasta]
    );
    return filas;
};

// Reporte productos sin stock (RF26)
const agotados = async () => {
    const [filas] = await db.query(
        `SELECT codigo, nombre, stock, stock_minimo FROM producto
 WHERE estado = 1 AND stock = 0
 ORDER BY nombre`
    );
    return filas;
};

// Reporte productos con stock igual o menor al minimo, sin llegar a 0 (RF27)
const porAgotarse = async () => {
    const [filas] = await db.query(
        `SELECT codigo, nombre, stock, stock_minimo FROM producto
 WHERE estado = 1 AND stock > 0 AND stock <= stock_minimo
 ORDER BY nombre`
    );
    return filas;
};

// Reporte de pedidos con su proveedor y estado (RF28)
const pedidos = async () => {
    const [filas] = await db.query(
        `SELECT p.id_pedido, p.fecha_pedido, p.tipo_pedido,
 p.estado, pr.nombre AS proveedor
 FROM pedido p
 JOIN proveedor pr ON pr.id_proveedor = p.id_proveedor
 ORDER BY p.fecha_pedido DESC`
    );
    return filas;
};

// Reporte de unidades vendidas por producto desde una fecha (RF12 y RF29)
const rotacion = async (desde) => {
    const [filas] = await db.query(
        `SELECT p.id_producto, p.codigo, p.nombre, p.stock,
 COALESCE((
 SELECT SUM(d.cantidad) FROM detalle_venta d
 JOIN venta v ON v.id_venta = d.id_venta
 WHERE d.id_producto = p.id_producto
 AND v.estado = 'Completada' AND v.fecha_venta >= ?
 ), 0) AS vendidas
 FROM producto p
 WHERE p.estado = 1
 ORDER BY p.nombre`,
        [desde]
    );
    return filas;
};

// Ventas, pedidos y devoluciones juntos (RF39)
const historial = async () => {
    const [ventasFilas] = await db.query(
        `SELECT 'Venta' AS tipo, v.id_venta AS referencia,
 v.fecha_venta AS fecha, v.estado, u.nombre AS usuario
 FROM venta v JOIN usuario u ON u.id_usuario = v.id_usuario`
    );
    const [pedidosFilas] = await db.query(
        `SELECT 'Pedido' AS tipo, p.id_pedido AS referencia,
 p.fecha_pedido AS fecha, p.estado, u.nombre AS usuario
 FROM pedido p JOIN usuario u ON u.id_usuario = p.id_usuario`
    );
    const [devolucionesFilas] = await db.query(
        `SELECT 'Devolucion' AS tipo, d.id_devolucion AS referencia,
 d.fecha AS fecha, 'Registrada' AS estado, u.nombre AS usuario
 FROM devolucion d JOIN usuario u ON u.id_usuario = d.id_usuario`
    );
    return [...ventasFilas, ...pedidosFilas, ...devolucionesFilas]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

module.exports = {
    ventas,
    agotados,
    porAgotarse,
    pedidos,
    rotacion,
    historial
};