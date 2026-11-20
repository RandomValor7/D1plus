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
        `INSERT INTO tienda
 (nombre, direccion, ciudad)
 VALUES (?, ?, ?)`,
        [nombre, direccion, ciudad]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const { nombre = null, direccion = null, ciudad = null } = datos;
    const [resultado] = await db.query(
        `UPDATE tienda
 SET nombre = COALESCE(?, nombre),
 direccion = COALESCE(?, direccion),
 ciudad = COALESCE(?, ciudad)
 WHERE id_tienda = ?`,
        [nombre, direccion, ciudad, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM tienda
 WHERE id_tienda = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};

