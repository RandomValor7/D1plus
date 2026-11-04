const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM producto_proveedor"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM producto_proveedor
 WHERE id_producto_proveedor = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { id_producto, id_proveedor } = datos;
    const [resultado] = await db.query(
        `INSERT INTO producto_proveedor
 (id_producto, id_proveedor)
 VALUES (?, ?)`,
        [id_producto, id_proveedor]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

