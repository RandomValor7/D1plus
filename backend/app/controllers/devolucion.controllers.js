const { DevolucionModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");
const { enteroPositivo } = require("../utils/lineas");

// RF39: historial de devoluciones
const getAll = async (req, res) => {
    try {
        res.json(await DevolucionModel.getAll());
    } catch (error) {
        manejarError(res, error, "consultar devoluciones");
    }
};

// RF23: devolucion de productos defectuosos a un proveedor
const create = async (req, res) => {
    try {
        const requeridos = [
            "id_producto", "id_proveedor", "cantidad", "motivo"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        if (!enteroPositivo(req.body.cantidad)) {
            return res.status(400).json({
                mensaje: "La cantidad debe ser un entero mayor a 0"
            });
        }
        const id = await DevolucionModel.create({
            ...req.body,
            id_usuario: req.usuario.id
        });
        res.status(201).json({ mensaje: "Devolucion registrada", id });
    } catch (error) {
        manejarError(res, error, "registrar devolucion");
    }
};

module.exports = { getAll, create };