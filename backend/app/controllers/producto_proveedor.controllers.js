const { ProductoProveedorModel } = require("../models");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await ProductoProveedorModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar producto_proveedor");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await ProductoProveedorModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar producto_proveedor");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["id_producto", "id_proveedor"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await ProductoProveedorModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en producto_proveedor");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = ["id_producto", "id_proveedor"];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await ProductoProveedorModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await ProductoProveedorModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en producto_proveedor");
    }
};
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await ProductoProveedorModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await ProductoProveedorModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en producto_proveedor");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

