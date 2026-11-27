// Registra las devolucions pero sino antes consultar 
// los usuarios por id, producto y demas.

const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        `SELECT d.id_devolucion, d.fecha, d.cantidad, d.motivo,
 p.nombre AS producto, pr.nombre AS proveedor,
 u.nombre AS usuario
 FROM devolucion d
 JOIN producto p ON p.id_producto = d.id_producto
 JOIN proveedor pr ON pr.id_proveedor = d.id_proveedor
 JOIN usuario u ON u.id_usuario = d.id_usuario
 ORDER BY d.fecha DESC`
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        "SELECT * FROM devolucion WHERE id_devolucion = ?",
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { cantidad, motivo, id_producto, id_proveedor, id_usuario } =
        datos;
    const [resultado] = await db.query(
        `INSERT INTO devolucion
 (cantidad, motivo, id_producto, id_proveedor, id_usuario)
 VALUES (?, ?, ?, ?, ?)`,
        [cantidad, motivo, id_producto, id_proveedor, id_usuario]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };
