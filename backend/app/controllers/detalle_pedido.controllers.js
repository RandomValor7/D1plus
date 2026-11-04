const { DetallePedidoModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await DetallePedidoModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar detalle_pedido");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await DetallePedidoModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar detalle_pedido");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = [
            "id_pedido", "id_producto", "cantidad", "precio"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await DetallePedidoModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en detalle_pedido");
    }
};

module.exports = { getAll, getById, create };

