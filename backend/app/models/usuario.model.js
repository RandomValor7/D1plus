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

// esto es solo para el login ya que trae la contrasena cifrada y el nombre del rol
const getByCorreo = async (correo) => {
    const [filas] = await db.query(
        `SELECT u.id_usuario, u.nombre, u.correo, u.contrasena,
 u.cargo, u.estado, r.nombre_rol
 FROM usuario u
 JOIN rol r ON r.id_rol = u.id_rol
 WHERE u.correo = ?`,
        [correo]
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

const update = async (id, datos) => {
    const {
        nombre = null, correo = null, cargo = null, id_rol = null,
        estado = null
    } = datos;
    const [resultado] = await db.query(
        `UPDATE usuario
 SET nombre = COALESCE(?, nombre),
 correo = COALESCE(?, correo),
 cargo = COALESCE(?, cargo),
 id_rol = COALESCE(?, id_rol),
 estado = COALESCE(?, estado)
 WHERE id_usuario = ?`,
        [nombre, correo, cargo, id_rol, estado, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `UPDATE usuario SET estado = 0
 WHERE id_usuario = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, getByCorreo, create, update, remove
};
