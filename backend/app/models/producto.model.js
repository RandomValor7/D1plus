const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM producto"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM producto
 WHERE id_producto = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const {
        codigo, nombre, precio, descripcion = null, stock = 0,
        stock_minimo = 0, fecha_vencimiento = null
    } = datos;
    const [resultado] = await db.query(
        `INSERT INTO producto
 (codigo, nombre, precio, descripcion, stock,
 stock_minimo, fecha_vencimiento)
 VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [codigo, nombre, precio, descripcion, stock,
            stock_minimo, fecha_vencimiento]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const {
        codigo = null, nombre = null, descripcion = null, precio = null,
        stock = null, stock_minimo = null, fecha_vencimiento = null,
        estado = null
    } = datos;
    const [resultado] = await db.query(
        `UPDATE producto
 SET codigo = COALESCE(?, codigo),
 nombre = COALESCE(?, nombre),
 descripcion = COALESCE(?, descripcion),
 precio = COALESCE(?, precio),
 stock = COALESCE(?, stock),
 stock_minimo = COALESCE(?, stock_minimo),
 fecha_vencimiento = COALESCE(?, fecha_vencimiento),
 estado = COALESCE(?, estado)
 WHERE id_producto = ?`,
        [codigo, nombre, descripcion, precio, stock, stock_minimo,
            fecha_vencimiento, estado, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `UPDATE producto SET estado = 0
 WHERE id_producto = ?`,
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove
};

