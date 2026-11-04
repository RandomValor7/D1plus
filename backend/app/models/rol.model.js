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

module.exports = { getAll, getById, create };
