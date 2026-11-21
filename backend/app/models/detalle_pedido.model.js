const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM detalle_pedido"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM detalle_pedido
 WHERE id_detalle = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { id_pedido, id_producto, cantidad, precio } = datos;
    const [resultado] = await db.query(
        `INSERT INTO detalle_pedido
 (id_pedido, id_producto, cantidad, precio)
 VALUES (?, ?, ?, ?)`,
        [id_pedido, id_producto, cantidad, precio]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const { cantidad = null, precio = null } = datos;
    const [resultado] = await db.query(
        `UPDATE detalle_pedido
 SET cantidad = COALESCE(?, cantidad),
 precio = COALESCE(?, precio)
 WHERE id_detalle = ?`,
        [cantidad, precio, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM detalle_pedido
 WHERE id_detalle = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};

