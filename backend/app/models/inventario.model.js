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

const update = async (id, datos) => {
    const { cantidad = null } = datos;
    const [resultado] = await db.query(
        `UPDATE inventario
 SET cantidad = COALESCE(?, cantidad),
 fecha_actualizacion = CURRENT_TIMESTAMP
 WHERE id_inventario = ?`,
        [cantidad, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM inventario
 WHERE id_inventario = ?`,
        [id]
    );
    return resultado.affectedRows;
};

// Inventario con nombres de producto y ubicacion (RF06 y RF07),  con filtros.
const detalle = async ({ id_bodega, id_tienda, buscar } = {}) => {
    let sql = `SELECT i.id_inventario, p.codigo, p.nombre AS producto,
 COALESCE(b.nombre, t.nombre) AS ubicacion, i.cantidad,
 p.stock_minimo AS minimo, i.fecha_actualizacion
 FROM inventario i
 JOIN producto p ON p.id_producto = i.id_producto
 LEFT JOIN bodega b ON b.id_bodega = i.id_bodega
 LEFT JOIN tienda t ON t.id_tienda = i.id_tienda
 WHERE p.estado = 1`;
    const valores = [];
    if (id_bodega) {
        sql += " AND i.id_bodega = ?";
        valores.push(id_bodega);
    }
    if (id_tienda) {
        sql += " AND i.id_tienda = ?";
        valores.push(id_tienda);
    }
    if (buscar) {
        sql += " AND p.nombre LIKE ?";
        valores.push("%" + buscar + "%");
    }
    const [filas] = await db.query(sql + " ORDER BY p.nombre", valores);
    return filas;
};

module.exports = {
    getAll, getById, create, update, remove, detalle
};
