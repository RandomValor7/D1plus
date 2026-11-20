const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM rol"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM rol
 WHERE id_rol = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { nombre_rol, descripcion = null } = datos;
    const [resultado] = await db.query(
        `INSERT INTO rol
 (nombre_rol, descripcion)
 VALUES (?, ?)`,
        [nombre_rol, descripcion]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const { nombre_rol = null, descripcion = null } = datos;
    const [resultado] = await db.query(
        `UPDATE rol
 SET nombre_rol = COALESCE(?, nombre_rol),
 descripcion = COALESCE(?, descripcion)
 WHERE id_rol = ?`,
        [nombre_rol, descripcion, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM rol
 WHERE id_rol = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};

