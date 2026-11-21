const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM pedido"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM pedido
 WHERE id_pedido = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { tipo_pedido, id_usuario, id_proveedor } = datos;
    const [resultado] = await db.query(
        `INSERT INTO pedido
 (tipo_pedido, id_usuario, id_proveedor)
 VALUES (?, ?, ?)`,
        [tipo_pedido, id_usuario, id_proveedor]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const {
        tipo_pedido = null, estado = null, id_proveedor = null
    } = datos;
    const [resultado] = await db.query(
        `UPDATE pedido
 SET tipo_pedido = COALESCE(?, tipo_pedido),
 estado = COALESCE(?, estado),
 id_proveedor = COALESCE(?, id_proveedor)
 WHERE id_pedido = ?`,
        [tipo_pedido, estado, id_proveedor, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM pedido
 WHERE id_pedido = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};

