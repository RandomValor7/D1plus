const { ProductoModel } = require("../models");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await ProductoModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar producto");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await ProductoModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar producto");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["codigo", "nombre", "precio"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await ProductoModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en producto");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = [
            "codigo", "nombre", "descripcion", "precio", "stock",
            "stock_minimo", "fecha_vencimiento", "estado"
        ];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await ProductoModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await ProductoModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en producto");
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await ProductoModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await ProductoModel.remove(id);
        res.json({ mensaje: "Registro dado de baja" });
    } catch (error) {
        manejarError(res, error, "eliminar en producto");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

