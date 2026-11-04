const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM movimiento_inventario"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM movimiento_inventario
 WHERE id_movimiento = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const {
        tipo_movimiento, cantidad, id_producto, id_usuario,
        id_inventario
    } = datos;
    const [resultado] = await db.query(
        `INSERT INTO movimiento_inventario
 (tipo_movimiento, cantidad, id_producto, id_usuario,
 id_inventario)
 VALUES (?, ?, ?, ?, ?)`,
        [tipo_movimiento, cantidad, id_producto, id_usuario,
            id_inventario]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

