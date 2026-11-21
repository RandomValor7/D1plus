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

const update = async (id, datos) => {
    const {
        nit = null, nombre = null, telefono = null, correo = null,
        direccion = null
    } = datos;
    const [resultado] = await db.query(
        `UPDATE proveedor
 SET nit = COALESCE(?, nit),
 nombre = COALESCE(?, nombre),
 telefono = COALESCE(?, telefono),
 correo = COALESCE(?, correo),
 direccion = COALESCE(?, direccion)
 WHERE id_proveedor = ?`,
        [nit, nombre, telefono, correo, direccion, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM proveedor
 WHERE id_proveedor = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};
