const { BodegaModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await BodegaModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar bodega");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await BodegaModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar bodega");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["nombre", "direccion"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await BodegaModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en bodega");
    }
};

module.exports = { getAll, getById, create };


