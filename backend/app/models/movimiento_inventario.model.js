const db = require("../config/db");
const { crearError } = require("../utils/errores");
const { enTransaccion } = require("../utils/transaccion");

const getAll = async () => {
    const [filas] = await db.query(
        "SELECT * FROM movimiento_inventario"
    );
    return filas;
};

const getById = async (id) => {
    const [filas] = await db.query(
        `SELECT * FROM movimiento_inventario
 WHERE id_movimiento = ?`,
        [id]
    );
    return filas[0];
};

const create = async (datos) => {
    const {
        tipo_movimiento, cantidad, id_producto, id_usuario,
        id_inventario
    } = datos;
    const [resultado] = await db.query(
        `INSERT INTO movimiento_inventario
 (tipo_movimiento, cantidad, id_producto, id_usuario,
 id_inventario)
 VALUES (?, ?, ?, ?, ?)`,
        [tipo_movimiento, cantidad, id_producto, id_usuario,
            id_inventario]
    );
    return resultado.insertId;
};

// ---- Operaciones de inventario (RF08, RF09 y RF10) ----
// Cada una corre en una transaccion: o se guarda todo o nada.
// Aplica una entrada o salida a un registro de inventario
const aplicar = async (
    conexion, idInventario, tipo, cantidad, idUsuario
) => {
    const [filas] = await conexion.query(
        `SELECT id_producto, cantidad FROM inventario
 WHERE id_inventario = ? FOR UPDATE`,
        [idInventario]
    );
    const registro = filas[0];
    if (!registro) {
        throw crearError(404, "El registro de inventario no existe");
    }
    if (tipo === "Salida" && registro.cantidad < cantidad) {
        throw crearError(
            409, "Cantidad insuficiente en inventario para la salida"
        );
    }
    await conexion.query(
        `INSERT INTO movimiento_inventario
 (tipo_movimiento, cantidad, id_producto, id_usuario, id_inventario)
 VALUES (?, ?, ?, ?, ?)`,
        [tipo, cantidad, registro.id_producto, idUsuario, idInventario]
    );
    const signo = tipo === "Entrada" ? "+" : "-";
    await conexion.query(
        `UPDATE inventario
 SET cantidad = cantidad ${signo} ?,
 fecha_actualizacion = CURRENT_TIMESTAMP
 WHERE id_inventario = ?`,
        [cantidad, idInventario]
    );
    return registro.id_producto;
};

// Busca el inventario de un producto en una bodega o tienda
const buscar = async (conexion, idProducto, { id_bodega, id_tienda }) => {
    const columna = id_bodega ? "id_bodega" : "id_tienda";
    const [filas] = await conexion.query(
        `SELECT id_inventario FROM inventario
 WHERE id_producto = ? AND ${columna} = ? FOR UPDATE`,
        [idProducto, id_bodega ?? id_tienda]
    );
    return filas[0]?.id_inventario;
};

// Igual que buscar, pero lo crea (en 0) si todavia no existe
const buscarOCrear = async (conexion, idProducto, ubicacion) => {
    const existente = await buscar(conexion, idProducto, ubicacion);
    if (existente) {
        return existente;
    }
    const columna = ubicacion.id_bodega ? "id_bodega" : "id_tienda";
    const [nuevo] = await conexion.query(
        `INSERT INTO inventario (id_producto, ${columna}, cantidad)
 VALUES (?, ?, 0)`,
        [idProducto, ubicacion.id_bodega ?? ubicacion.id_tienda]
    );
    return nuevo.insertId;
};

const sumarStock = (conexion, idProducto, delta) =>
    conexion.query(
        "UPDATE producto SET stock = stock + ? WHERE id_producto = ?",
        [delta, idProducto]
    );

// RF08: entra mercancia a una bodega (sube el stock del producto)
const entrada = (datos) => enTransaccion(async (conexion) => {
    const { id_producto, id_bodega, cantidad, id_usuario } = datos;
    const idInventario = await buscarOCrear(
        conexion, id_producto, { id_bodega }
    );
    await aplicar(conexion, idInventario, "Entrada", cantidad, id_usuario);
    await sumarStock(conexion, id_producto, cantidad);
    return idInventario;
});

// RF09: sale de una bodega hacia otra bodega o una tienda
// (el producto sigue siendo de la empresa: el stock no cambia)
const salida = (datos) => enTransaccion(async (conexion) => {
    const { id_producto, id_bodega_origen, cantidad, id_usuario } = datos;
    const origen = await buscar(
        conexion, id_producto, { id_bodega: id_bodega_origen }
    );
    if (!origen) {
        throw crearError(
            404, "El producto no tiene inventario en la bodega de origen"
        );
    }
    const destino = await buscarOCrear(conexion, id_producto, {
        id_bodega: datos.id_bodega_destino,
        id_tienda: datos.id_tienda_destino
    });
    await aplicar(conexion, origen, "Salida", cantidad, id_usuario);
    await aplicar(conexion, destino, "Entrada", cantidad, id_usuario);
    return { origen, destino };
});

// RF10: cambia la cantidad a mano y deja la observacion en auditoria
const ajustar = (datos) => enTransaccion(async (conexion) => {
    const { id_inventario, cantidad_nueva, observacion, id_usuario } =
        datos;
    const [filas] = await conexion.query(
        `SELECT id_producto, cantidad FROM inventario
 WHERE id_inventario = ? FOR UPDATE`,
        [id_inventario]
    );
    const registro = filas[0];
    if (!registro) {
        throw crearError(404, "El registro de inventario no existe");
    }
    const diferencia = cantidad_nueva - registro.cantidad;
    if (diferencia === 0) {
        throw crearError(400, "La cantidad nueva es igual a la actual");
    }
    const tipo = diferencia > 0 ? "Entrada" : "Salida";
    await aplicar(
        conexion, id_inventario, tipo, Math.abs(diferencia), id_usuario
    );
    await sumarStock(conexion, registro.id_producto, diferencia);
    await conexion.query(
        `INSERT INTO auditoria (accion, descripcion, id_usuario)
 VALUES (?, ?, ?)`,
        [
            "Ajuste manual de inventario",
            ("Inventario #" + id_inventario + ": de " + registro.cantidad +
                " a " + cantidad_nueva + ". " + observacion).slice(0, 255),
            id_usuario
        ]
    );
    return { id_producto: registro.id_producto, diferencia };
});

// RF38: historial de movimientos con nombres. Filtro: id_producto
const detalle = async ({ id_producto } = {}) => {
    let sql = `SELECT m.id_movimiento, m.tipo_movimiento, m.cantidad,
 m.fecha, p.nombre AS producto, u.nombre AS usuario,
 COALESCE(b.nombre, t.nombre) AS ubicacion
 FROM movimiento_inventario m
 JOIN producto p ON p.id_producto = m.id_producto
 JOIN usuario u ON u.id_usuario = m.id_usuario
 JOIN inventario i ON i.id_inventario = m.id_inventario
 LEFT JOIN bodega b ON b.id_bodega = i.id_bodega
 LEFT JOIN tienda t ON t.id_tienda = i.id_tienda
 WHERE 1 = 1`;
    const valores = [];
    if (id_producto) {
        sql += " AND m.id_producto = ?";
        valores.push(id_producto);
    }
    const [filas] = await db.query(sql + " ORDER BY m.fecha DESC", valores);
    return filas;
};

module.exports = {
    getAll, getById, create, entrada, salida, ajustar, detalle
};


