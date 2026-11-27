const db = require("../config/db");
const { crearError } = require("../utils/errores");
const { enTransaccion } = require("../utils/transaccion");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM pedido"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM pedido
 WHERE id_pedido = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const { tipo_pedido, id_usuario, id_proveedor } = datos;
    const [resultado] = await db.query(
        `INSERT INTO pedido
 (tipo_pedido, id_usuario, id_proveedor)
 VALUES (?, ?, ?)`,
        [tipo_pedido, id_usuario, id_proveedor]
    );
    return resultado.insertId;
};

const update = async (id, datos) => {
    const {
        tipo_pedido = null, estado = null, id_proveedor = null
    } = datos;
    const [resultado] = await db.query(
        `UPDATE pedido
 SET tipo_pedido = COALESCE(?, tipo_pedido),
 estado = COALESCE(?, estado),
 id_proveedor = COALESCE(?, id_proveedor)
 WHERE id_pedido = ?`,
        [tipo_pedido, estado, id_proveedor, id]
    );
    return resultado.affectedRows;
};

const remove = async (id) => {
    const [resultado] = await db.query(
        `DELETE FROM pedido
 WHERE id_pedido = ?`,
        [id]
    );
    return resultado.affectedRows;
};

// Agrega las lineas de un pedido (el precio sale del producto)
const agregarLineas = async (conexion, idPedido, lineas) => {
    for (const linea of lineas) {
        const [filas] = await conexion.query(
            "SELECT precio, estado FROM producto WHERE id_producto = ?",
            [linea.id_producto]
        );
        if (!filas[0] || filas[0].estado !== 1) {
            throw crearError(
                404, "Producto no disponible: " + linea.id_producto
            );
        }
        await conexion.query(
            `INSERT INTO detalle_pedido
 (id_pedido, id_producto, cantidad, precio)
 VALUES (?, ?, ?, ?)`,
            [idPedido, linea.id_producto, linea.cantidad, filas[0].precio]
        );
    }
};

// RF15 y RF16: crea el pedido (estado Pendiente) con sus lineas
const crearConLineas = (datos) => enTransaccion(async (conexion) => {
    const { id_usuario, id_proveedor, tipo_pedido, lineas } = datos;
    const [pedido] = await conexion.query(
        `INSERT INTO pedido (tipo_pedido, id_usuario, id_proveedor)
 VALUES (?, ?, ?)`,
        [tipo_pedido, id_usuario, id_proveedor]
    );
    await agregarLineas(conexion, pedido.insertId, lineas);
    return pedido.insertId;
});

// RF17: cambia todas las lineas de un pedido que sigue Pendiente
const reemplazarLineas = (idPedido, lineas) =>
    enTransaccion(async (conexion) => {
        await conexion.query(
            "DELETE FROM detalle_pedido WHERE id_pedido = ?",
            [idPedido]
        );
        await agregarLineas(conexion, idPedido, lineas);
    });

// RF18, RF19 y RF20: cambia el estado del pedido
const cambiarEstado = async (id, estado) => {
    const [resultado] = await db.query(
        "UPDATE pedido SET estado = ? WHERE id_pedido = ?",
        [estado, id]
    );
    return resultado.affectedRows;
};

module.exports = {
    getAll, getById, create, update, remove,
    crearConLineas, reemplazarLineas, cambiarEstado
};
