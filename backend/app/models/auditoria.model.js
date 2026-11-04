const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM auditoria"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM auditoria
 WHERE id_auditoria = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { accion, id_usuario, descripcion = null } = datos;
    const [resultado] = await db.query(
        `INSERT INTO auditoria
 (accion, id_usuario, descripcion)
 VALUES (?, ?, ?)`,
        [accion, id_usuario, descripcion]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

