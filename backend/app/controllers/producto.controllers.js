const { ProductoModel } = require("../models");
const { faltanCampos, manejarError } =
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

module.exports = { getAll, getById, create };
