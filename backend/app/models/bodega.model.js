const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM bodega"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM bodega
 WHERE id_bodega = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { nombre, direccion, telefono = null } = datos;
    const [resultado] = await db.query(
        `INSERT INTO bodega
 (nombre, direccion, telefono)
 VALUES (?, ?, ?)`,
        [nombre, direccion, telefono]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const { nombre = null, direccion = null, telefono = null } = datos;
    const [resultado] = await db.query(
        `UPDATE bodega
 SET nombre = COALESCE(?, nombre),
 direccion = COALESCE(?, direccion),
 telefono = COALESCE(?, telefono)
 WHERE id_bodega = ?`,
        [nombre, direccion, telefono, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM bodega
 WHERE id_bodega = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};

