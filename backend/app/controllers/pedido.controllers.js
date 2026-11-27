const { PedidoModel } = require("../models");
const { ROLES } = require("../config/permisos");
const { unirLineas } = require("../utils/lineas");
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

// RF16: pedido manual con sus productos (queda Pendiente)
const crear = async (req, res) => {
    try {
        const requeridos = ["id_proveedor", "tipo_pedido"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const { lineas, error } = unirLineas(req.body.lineas);
        if (error) {
            return res.status(400).json({ mensaje: error });
        }
        const id = await PedidoModel.crearConLineas({
            id_usuario: req.usuario.id,
            id_proveedor: req.body.id_proveedor,
            tipo_pedido: req.body.tipo_pedido,
            lineas
        });
        res.status(201).json({ mensaje: "Pedido creado", id });
    } catch (error) {
        manejarError(res, error, "crear pedido");
    }
};

// RF17: editar los productos de un pedido antes de su aprobacion
const editar = async (req, res) => {
    try {
        const { id } = req.params;
        const { lineas, error } = unirLineas(req.body?.lineas);
        if (error) {
            return res.status(400).json({ mensaje: error });
        }
        const pedido = await PedidoModel.getById(id);
        if (!pedido) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        if (pedido.estado !== "Pendiente") {
            return res.status(409).json({
                mensaje: "Solo se puede editar un pedido Pendiente"
            });
        }
        const esTienda = req.usuario.rol === ROLES.TIENDA;
        if (esTienda && pedido.id_usuario !== req.usuario.id) {
            return res.status(403).json({
                mensaje: "Solo puedes editar tus propios pedidos"
            });
        }
        await PedidoModel.reemplazarLineas(id, lineas);
        res.json({ mensaje: "Pedido actualizado" });
    } catch (error) {
        manejarError(res, error, "editar pedido");
    }
};

// RF18, RF19 y RF20: el pedido pasa de un estado a otro
// Pendiente -> Aprobado o Rechazado -> Despachado -> Recibido
const cambiarEstado = (desde, hacia) => async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await PedidoModel.getById(id);
        if (!pedido) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        if (pedido.estado !== desde) {
            return res.status(409).json({
                mensaje: "El pedido debe estar " + desde +
                    " (ahora esta " + pedido.estado + ")"
            });
        }
        await PedidoModel.cambiarEstado(id, hacia);
        res.json({ mensaje: "Pedido " + hacia });
    } catch (error) {
        manejarError(res, error, "cambiar estado del pedido");
    }
};

const aprobar = cambiarEstado("Pendiente", "Aprobado");
const rechazar = cambiarEstado("Pendiente", "Rechazado");
const despachar = cambiarEstado("Aprobado", "Despachado");
const recibir = cambiarEstado("Despachado", "Recibido");

module.exports = {
    getAll, getById, create, update, remove,
    crear, editar, aprobar, rechazar, despachar, recibir
};

