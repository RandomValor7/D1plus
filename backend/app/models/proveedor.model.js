const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM proveedor"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM proveedor
 WHERE id_proveedor = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const {
        nit, nombre, telefono = null, correo = null,
        direccion = null
    } = datos;
    const [resultado] = await db.query(
        `INSERT INTO proveedor
 (nit, nombre, telefono, correo, direccion)
 VALUES (?, ?, ?, ?, ?)`,
        [nit, nombre, telefono, correo, direccion]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };
