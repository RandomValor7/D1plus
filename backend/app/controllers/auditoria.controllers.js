const { AuditoriaModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await AuditoriaModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar auditoria");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await AuditoriaModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar auditoria");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["accion", "id_usuario"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await AuditoriaModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en auditoria");
    }
};

module.exports = { getAll, getById, create };

