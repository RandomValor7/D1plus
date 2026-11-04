const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM tienda"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM tienda
 WHERE id_tienda = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { nombre, direccion, ciudad } = datos;
    const [resultado] = await db.query(
        `INSERT INTO ti
 (nombre, direccion, ciudad)
 VALUES (?, ?, ?)`,
        [nombre, direccion, ciudad]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

