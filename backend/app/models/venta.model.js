const db = require("../config/db");
const { crearError } = require("../utils/errores");
const { enTransaccion } = require("../utils/transaccion");

const getAll = async () => {
    const [filas] = await db.query(
        `SELECT v.*, u.nombre AS vendedor
 FROM venta v
 JOIN usuario u ON u.id_usuario = v.id_usuario
 ORDER BY v.fecha_venta DESC, v.id_venta DESC`
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM venta
 WHERE id_venta = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { total, id_usuario } = datos;
    const [resultado] = await db.query(
        `INSERT INTO venta
 (total, id_usuario)
 VALUES (?, ?)`,
        [total, id_usuario]
    );
    return resultado.insertId;
};

const anular = async (id, idUsuario, justificacion) => {
    const conexion = await db.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query(
            `UPDATE venta SET estado = 'Anulada'
 WHERE id_venta = ?`,
            [id]
        );
        await conexion.query(
            `INSERT INTO auditoria (accion, descripcion, id_usuario)
 VALUES (?, ?, ?)`,
            [
                "Anular venta",
                "Venta #" + id + " anulada: " + justificacion,
                idUsuario
            ]
        );
        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
};

// RF13: registra una venta con todas sus lineas y baja el stock.
// El precio sale de la base de datos, no de lo que envie el cliente.
const registrar = (idUsuario, lineas) => enTransaccion(async (conexion) => {
    let total = 0;
    const detalles = [];
    for (const linea of lineas) {
        const [filas] = await conexion.query(
            `SELECT id_producto, nombre, precio, stock, estado
 FROM producto WHERE id_producto = ? FOR UPDATE`,
            [linea.id_producto]
        );
        const producto = filas[0];
        if (!producto || producto.estado !== 1) {
            throw crearError(
                404, "Producto no disponible: " + linea.id_producto
            );
        }
        if (producto.stock < linea.cantidad) {
            throw crearError(
                409, "Stock insuficiente para " + producto.nombre
            );
        }
        const subtotal = Number(producto.precio) * linea.cantidad;
        total += subtotal;
        detalles.push({ ...linea, subtotal });
    }
    const [venta] = await conexion.query(
        `INSERT INTO venta (total, estado, id_usuario)
 VALUES (?, 'Completada', ?)`,
        [total, idUsuario]
    );
    for (const d of detalles) {
        await conexion.query(
            `INSERT INTO detalle_venta
 (id_venta, id_producto, cantidad, subtotal)
 VALUES (?, ?, ?, ?)`,
            [venta.insertId, d.id_producto, d.cantidad, d.subtotal]
        );
        await conexion.query(
            "UPDATE producto SET stock = stock - ? WHERE id_producto = ?",
            [d.cantidad, d.id_producto]
        );
    }
    return {
        id_venta: venta.insertId,
        total,
        productos: detalles.map((d) => d.id_producto)
    };
});

module.exports = { getAll, getById, create, anular, registrar };

