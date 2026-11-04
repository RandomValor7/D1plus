const { VentaModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await VentaModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar venta");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await VentaModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar venta");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["total", "id_usuario"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await VentaModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en venta");
    }
};

module.exports = { getAll, getById, create };

