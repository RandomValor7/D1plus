const { RolModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await RolModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar rol");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await RolModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar rol");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["nombre_rol"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await RolModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en rol");
    }
};

module.exports = { getAll, getById, create };

