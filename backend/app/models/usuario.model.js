const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        `SELECT id_usuario, nombre, correo, cargo,
 estado, fecha_registro, id_rol
 FROM usuario`
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT id_usuario, nombre, correo, cargo,
 estado, fecha_registro, id_rol
 FROM usuario WHERE id_usuario = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { nombre, correo, contrasena, cargo, id_rol } = datos;
    const [resultado] = await db.query(
        `INSERT INTO usuario
 (nombre, correo, contrasena, cargo, id_rol)
 VALUES (?, ?, ?, ?, ?)`,
        [nombre, correo, contrasena, cargo, id_rol]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };
