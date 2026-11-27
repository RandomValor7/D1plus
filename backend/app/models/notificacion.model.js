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

const update = async (id, datos) => {
    const { mensaje = null, tipo = null, estado = null } = datos;
    const [resultado] = await db.query(
        `UPDATE notificacion
 SET mensaje = COALESCE(?, mensaje),
 tipo = COALESCE(?, tipo),
 estado = COALESCE(?, estado)
 WHERE id_notificacion = ?`,
        [mensaje, tipo, estado, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM notificacion
 WHERE id_notificacion = ?`,
        [id]
    );
    return resultado.affectedRows;
};

// Notificaciones de un usuario, las mas nuevas primero (RF33 a RF36)
const getByUsuario = async (idUsuario) => {
    const [filas] = await db.query(
        `SELECT * FROM notificacion WHERE id_usuario = ?
 ORDER BY fecha DESC, id_notificacion DESC`,
        [idUsuario]
    );
    return filas;
};

module.exports = {
    getAll, getById, create, update, remove, getByUsuario
};

