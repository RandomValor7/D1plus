const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM venta"
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

module.exports = { getAll, getById, create };

