const { InventarioModel } = require("../models");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await InventarioModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar inventario");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await InventarioModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar inventario");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["id_producto"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await InventarioModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        })
    } catch (error) {
        manejarError(res, error, "crear en inventario");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = ["cantidad"];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        if (Number(req.body.cantidad) < 0) {
            return res.status(400).json({
                mensaje: "La cantidad no puede ser negativa"
            });
        }
        const existente = await InventarioModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await InventarioModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en inventario");
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await InventarioModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await InventarioModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en inventario");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

