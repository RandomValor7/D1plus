const { UsuarioModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await UsuarioModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar usuario");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await UsuarioModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar usuario");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = [
            "nombre", "correo", "contrasena", "cargo", "id_rol"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await UsuarioModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en usuario");
    }
};

module.exports = { getAll, getById, create };

