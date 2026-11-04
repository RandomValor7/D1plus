const db = require("../config/db");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM inventario"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM inventario
 WHERE id_inventario = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const {
        id_producto, id_bodega = null, id_tienda = null,
        cantidad = 0
    } = datos;
    const [resultado] = await db.query(
        `INSERT INTO inventario
 (id_producto, id_bodega, id_tienda, cantidad)
 VALUES (?, ?, ?, ?)`,
        [id_producto, id_bodega, id_tienda, cantidad]
    );
    return resultado.insertId;
};

module.exports = { getAll, getById, create };

