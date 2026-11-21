const { DetallePedidoModel, PedidoModel } =
    require("../models");
const { faltanCampos, manejarError, sinCambios } =
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

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = ["cantidad", "precio"];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await DetallePedidoModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        const pedido = await PedidoModel.getById(
            existente.id_pedido
        );
        if (pedido.estado !== "Pendiente") {
            return res.status(409).json({
                mensaje: "Solo se modifica un pedido Pendiente"
            });
        }
        await DetallePedidoModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en detalle_pedido");
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await DetallePedidoModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        const pedido = await PedidoModel.getById(
            existente.id_pedido
        );
        if (pedido.estado !== "Pendiente") {
            return res.status(409).json({
                mensaje: "Solo se modifica un pedido Pendiente"
            });
        }
        await DetallePedidoModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en detalle_pedido");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

