import db from "../config/db.js";

export const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM producto"
    );
    return filas;
};

export const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM producto
 WHERE id_producto = ?`,
        [id]
    );
    return filas[0];
};

export const create = async (datos) => {
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

