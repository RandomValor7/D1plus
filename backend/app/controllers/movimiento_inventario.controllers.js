const { MovimientoInventarioModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await MovimientoInventarioModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(
            res, error, "consultar movimiento_inventario"
        );
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await MovimientoInventarioModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(
            res, error, "consultar movimiento_inventario"
        );
    }
};

const create = async (req, res) => {
    try {
        const requeridos = [
            "tipo_movimiento", "cantidad", "id_producto",
            "id_usuario", "id_inventario"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await MovimientoInventarioModel.create(
            req.body
        );
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(
            res, error, "crear en movimiento_inventario"
        );
    }
};

module.exports = { getAll, getById, create };

