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

module.exports = { getAll, getById, create };

