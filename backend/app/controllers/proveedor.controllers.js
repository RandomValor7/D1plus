const { ProveedorModel } = require("../models");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await ProveedorModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar proveedor");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await ProveedorModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar proveedor");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["nit", "nombre"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await ProveedorModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en proveedor");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = [
            "nit", "nombre", "telefono", "correo", "direccion"
        ];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await ProveedorModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await ProveedorModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en proveedor");
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await ProveedorModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await ProveedorModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en proveedor");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

