const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM notificacion"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM notificacion
 WHERE id_notificacion = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { mensaje, tipo, id_usuario } = datos;
    const [resultado] = await db.query(
        `INSERT INTO notificacion
 (mensaje, tipo, id_usuario)
 VALUES (?, ?, ?)`,
        [mensaje, tipo, id_usuario]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

