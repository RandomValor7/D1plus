const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM detalle_venta"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM detalle_venta
 WHERE id_detalle_venta = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { id_venta, id_producto, cantidad, subtotal } = datos;
    const [resultado] = await db.query(
        `INSERT INTO detalle_venta
 (id_venta, id_producto, cantidad, subtotal)
 VALUES (?, ?, ?, ?)`,
        [id_venta, id_producto, cantidad, subtotal]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

