const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM inventario"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM inventario
 WHERE id_inventario = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const {
        id_producto, id_bodega = null, id_tienda = null,
        cantidad = 0
    } = datos;
    const [resultado] = await db.query(
        `INSERT INTO inventario
 (id_producto, id_bodega, id_tienda, cantidad)
 VALUES (?, ?, ?, ?)`,
        [id_producto, id_bodega, id_tienda, cantidad]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const { cantidad = null } = datos;
    const [resultado] = await db.query(
        `UPDATE inventario
 SET cantidad = COALESCE(?, cantidad),
 fecha_actualizacion = CURRENT_TIMESTAMP
 WHERE id_inventario = ?`,
        [cantidad, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM inventario
 WHERE id_inventario = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};
