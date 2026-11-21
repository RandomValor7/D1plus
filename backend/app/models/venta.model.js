const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM venta"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM venta
 WHERE id_venta = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { total, id_usuario } = datos;
    const [resultado] = await db.query(
        `INSERT INTO venta
 (total, id_usuario)
 VALUES (?, ?)`,
        [total, id_usuario]
    );
    return resultado.insertId;
};

const anular = async (id, idUsuario, justificacion) => {
    const conexion = await db.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query(
            `UPDATE venta SET estado = 'Anulada'
 WHERE id_venta = ?`,
            [id]
        );
        await conexion.query(
            `INSERT INTO auditoria (accion, descripcion, id_usuario)
 VALUES (?, ?, ?)`,
            [
                "Anular venta",
                "Venta #" + id + " anulada: " + justificacion,
                idUsuario
            ]
        );
        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
};

module.exports = { getAll, getById, create, anular };

