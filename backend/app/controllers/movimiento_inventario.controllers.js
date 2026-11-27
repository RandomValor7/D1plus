const { MovimientoInventarioModel } = require("../models");
const { enteroPositivo } = require("../utils/lineas");
const reposicion = require("../servicios/reposicion");

const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await MovimientoInventarioModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(
            res, error, "consultar movimiento_inventario"
        );
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await MovimientoInventarioModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(
            res, error, "consultar movimiento_inventario"
        );
    }
};

const create = async (req, res) => {
    try {
        const requeridos = [
            "tipo_movimiento", "cantidad", "id_producto",
            "id_usuario", "id_inventario"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await MovimientoInventarioModel.create(
            req.body
        );
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(
            res, error, "crear en movimiento_inventario"
        );
    }
};

// RF08: entrada de mercancia a una bodega
const entrada = async (req, res) => {
    try {
        const requeridos = ["id_producto", "id_bodega", "cantidad"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        if (!enteroPositivo(req.body.cantidad)) {
            return res.status(400).json({
                mensaje: "La cantidad debe ser un entero mayor a 0"
            });
        }
        const id = await MovimientoInventarioModel.entrada({
            ...req.body,
            id_usuario: req.usuario.id
        });
        res.status(201).json({
            mensaje: "Entrada registrada",
            id_inventario: id
        });
    } catch (error) {
        manejarError(res, error, "registrar entrada");
    }
};

// RF09: salida desde una bodega hacia otra bodega o una tienda
const salida = async (req, res) => {
    try {
        const requeridos = ["id_producto", "id_bodega_origen", "cantidad"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const { id_bodega_destino, id_tienda_destino } = req.body;
        if (!id_bodega_destino === !id_tienda_destino) {
            return res.status(400).json({
                mensaje: "Envie id_bodega_destino o id_tienda_destino"
            });
        }
        if (id_bodega_destino === req.body.id_bodega_origen) {
            return res.status(400).json({
                mensaje: "El destino debe ser distinto del origen"
            });
        }
        if (!enteroPositivo(req.body.cantidad)) {
            return res.status(400).json({
                mensaje: "La cantidad debe ser un entero mayor a 0"
            });
        }
        const ids = await MovimientoInventarioModel.salida({
            ...req.body,
            id_usuario: req.usuario.id
        });
        res.status(201).json({ mensaje: "Salida registrada", ...ids });
    } catch (error) {
        manejarError(res, error, "registrar salida");
    }
};

// RF10: ajuste manual con observacion obligatoria
const ajuste = async (req, res) => {
    try {
        const requeridos = [
            "id_inventario", "cantidad_nueva", "observacion"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const nueva = Number(req.body.cantidad_nueva);
        if (!Number.isInteger(nueva) || nueva < 0) {
            return res.status(400).json({
                mensaje: "La cantidad nueva debe ser un entero desde 0"
            });
        }
        const resultado = await MovimientoInventarioModel.ajustar({
            ...req.body,
            cantidad_nueva: nueva,
            id_usuario: req.usuario.id
        });
        await reposicion
            .revisarProducto(resultado.id_producto, req.usuario.id)
            .catch((e) => console.error(e));
        res.json({ mensaje: "Inventario actualizado" });
    } catch (error) {
        manejarError(res, error, "ajustar inventario");
    }
};

// RF38: historial de movimientos de inventario
const historial = async (req, res) => {
    try {
        const filas = await MovimientoInventarioModel.detalle({
            id_producto: req.query.id_producto
        });
        res.json(filas);
    } catch (error) {
        manejarError(res, error, "consultar historial de inventario");
    }
};

module.exports = {
    getAll, getById, create, entrada, salida, ajuste, historial
};

