const { InventarioModel, ReporteModel } = require("../models");
const { manejarError } = require("../utils/errores");
const { enviarReporte } = require("../utils/exportar");
const reglas = require("../config/reglas");

const {
    aDia, aSql, leerFecha, rangoPeriodo, sumarDias
} = require("../utils/fechas");

const { agruparVentas, clasificarRotacion } =
    require("../utils/reportes");

// RF24: ventas diarias, semanales o mensuales
// /api/reportes/ventas?periodo=diario&fecha=2026-11-26
const ventas = async (req, res) => {
    try {
        const periodo = req.query.periodo ?? "diario";
        let referencia = new Date();
        if (req.query.fecha) {
            referencia = leerFecha(req.query.fecha);
        }
        const rango = referencia && rangoPeriodo(periodo, referencia);
        if (!rango) {
            return res.status(400).json({
                mensaje: "Use periodo diario, semanal o mensual y " +
                    "fecha con formato AAAA-MM-DD"
            });
        }
        const filas = agruparVentas(
            await ReporteModel.ventas(aSql(rango.desde), aSql(rango.hasta))
        );
        await enviarReporte(res, req.query.formato, {
            titulo: "Reporte de ventas " + periodo,
            periodo,
            desde: aDia(rango.desde),
            hasta: aDia(sumarDias(rango.hasta, -1)),
            cantidad_ventas: filas.reduce((s, f) => s + f.ventas, 0),
            total: filas.reduce((s, f) => s + f.total, 0),
            columnas: [
                { clave: "fecha", titulo: "Fecha" },
                { clave: "ventas", titulo: "Ventas" },
                { clave: "total", titulo: "Total" }
            ],
            filas
        });
    } catch (error) {
        manejarError(res, error, "generar reporte de ventas");
    }
};

// RF25: inventario en tiempo real (filtros: id_bodega, id_tienda)
const inventario = async (req, res) => {
    try {
        const filas = await InventarioModel.detalle({
            id_bodega: req.query.id_bodega,
            id_tienda: req.query.id_tienda
        });
        await enviarReporte(res, req.query.formato, {
            titulo: "Reporte de inventario",
            columnas: [
                { clave: "codigo", titulo: "Codigo" },
                { clave: "producto", titulo: "Producto" },
                { clave: "ubicacion", titulo: "Ubicacion" },
                { clave: "cantidad", titulo: "Cantidad" },
                { clave: "minimo", titulo: "Minimo" }
            ],
            filas
        });
    } catch (error) {
        manejarError(res, error, "generar reporte de inventario");
    }
};
const columnasStock = [
    { clave: "codigo", titulo: "Codigo" },
    { clave: "nombre", titulo: "Producto" },
    { clave: "stock", titulo: "Stock" },
    { clave: "stock_minimo", titulo: "Minimo" }
];

// RF26: productos agotados
const agotados = async (req, res) => {
    try {
        await enviarReporte(res, req.query.formato, {
            titulo: "Productos agotados",
            columnas: columnasStock,
            filas: await ReporteModel.agotados()
        });
    } catch (error) {
        manejarError(res, error, "generar reporte de agotados");
    }
};
// RF27: productos proximos a agotarse
const porAgotarse = async (req, res) => {
    try {
        await enviarReporte(res, req.query.formato, {
            titulo: "Productos proximos a agotarse",
            columnas: columnasStock,
            filas: await ReporteModel.porAgotarse()
        });
    } catch (error) {
        manejarError(res, error, "generar reporte de por agotarse");
    }
};

// RF28: pedidos procesados y pendientes
const pedidos = async (req, res) => {
    try {
        const filas = await ReporteModel.pedidos();
        const pendientes = filas.filter((p) => p.estado === "Pendiente");
        await enviarReporte(res, req.query.formato, {
            titulo: "Reporte de pedidos",
            pendientes: pendientes.length,
            procesados: filas.length - pendientes.length,
            columnas: [
                { clave: "id_pedido", titulo: "Pedido" },
                { clave: "fecha_pedido", titulo: "Fecha" },
                { clave: "proveedor", titulo: "Proveedor" },
                { clave: "tipo_pedido", titulo: "Tipo" },
                { clave: "estado", titulo: "Estado" }
            ],
            filas
        });
    } catch (error) {
        manejarError(res, error, "generar reporte de pedidos");
    }
};

// RF29: rotacion de productos segun lo vendido en los ultimos dias
const rotacion = async (req, res) => {
    try {
        const desde = aSql(sumarDias(new Date(), -reglas.DIAS_ROTACION));
        const filas = (await ReporteModel.rotacion(desde)).map((p) => ({
            ...p,
            vendidas: Number(p.vendidas),
            nivel: clasificarRotacion(Number(p.vendidas))
        }));
        await enviarReporte(res, req.query.formato, {
            titulo: "Rotacion de productos",
            dias: reglas.DIAS_ROTACION,
            columnas: [
                { clave: "nombre", titulo: "Producto" },
                { clave: "vendidas", titulo: "Unidades vendidas" },
                { clave: "nivel", titulo: "Rotacion" }
            ],
            filas
        });
    } catch (error) {
        manejarError(res, error, "generar reporte de rotacion");
    }
};

// RF39: historial de ventas, pedidos y devoluciones (?tipo=Venta)
const historial = async (req, res) => {
    try {
        let filas = await ReporteModel.historial();
        if (req.query.tipo) {
            filas = filas.filter((f) => f.tipo === req.query.tipo);
        }
        res.json(filas);
    } catch (error) {
        manejarError(res, error, "consultar historial");
    }
};

module.exports = {
    ventas,
    inventario,
    agotados,
    porAgotarse,
    pedidos,
    rotacion,
    historial
};

