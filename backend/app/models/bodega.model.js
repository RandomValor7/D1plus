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

module.exports = { getAll, getById, create };

