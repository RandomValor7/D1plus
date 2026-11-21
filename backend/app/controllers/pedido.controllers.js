const { PedidoModel } = require("../models");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await PedidoModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar pedido");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await PedidoModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar pedido");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = [
            "tipo_pedido", "id_usuario", "id_proveedor"
        ];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await PedidoModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en pedido");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = ["tipo_pedido", "estado", "id_proveedor"];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await PedidoModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await PedidoModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en pedido");
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await PedidoModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        if (existente.estado !== "Pendiente") {
            return res.status(409).json({
                mensaje: "Solo se puede eliminar un pedido Pendiente"
            });
        }
        await PedidoModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en pedido");
    }
};

module.exports = {
    getAll, getById, create, update, remove
};

