const { DetalleVentaModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await DetalleVentaModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar detalle_venta");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await DetalleVentaModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar detalle_venta");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = [
            "id_venta", "id_producto", "cantidad", "subtotal"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await DetalleVentaModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en detalle_venta");
    }
};

module.exports = { getAll, getById, create };

