const { TiendaModel } = require("../models");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await TiendaModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar tienda");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await TiendaModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar tienda");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["nombre", "direccion", "ciudad"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await TiendaModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en tienda");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = ["nombre", "direccion", "ciudad"];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await TiendaModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await TiendaModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en tienda");
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await TiendaModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await TiendaModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en tienda");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

