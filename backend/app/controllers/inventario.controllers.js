const { InventarioModel } = require("../models");
const { faltanCampos, manejarError } =
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

module.exports = { getAll, getById, create };


