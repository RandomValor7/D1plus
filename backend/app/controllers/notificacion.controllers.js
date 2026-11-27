const { NotificacionModel } = require("../models");
const alertas = require("../servicios/alertas");
const { faltanCampos, manejarError, sinCambios } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await NotificacionModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar notificacion");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await NotificacionModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar notificacion");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["mensaje", "tipo", "id_usuario"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await NotificacionModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en notificacion");
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const editables = ["mensaje", "tipo", "estado"];
        if (sinCambios(res, req.body, editables)) {
            return;
        }
        const existente = await NotificacionModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await NotificacionModel.update(id, req.body);
        res.json({ mensaje: "Registro actualizado" });
    } catch (error) {
        manejarError(res, error, "actualizar en notificacion");
    }
};
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const existente = await NotificacionModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        await NotificacionModel.remove(id);
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        manejarError(res, error, "eliminar en notificacion");
    }
};

// Las notificaciones del usuario que inicio sesion
const mias = async (req, res) => {
    try {
        const filas = await NotificacionModel.getByUsuario(req.usuario.id);
        res.json(filas);
    } catch (error) {
        manejarError(res, error, "consultar notificaciones");
    }
};
// Revisa stock, vencimientos, pedidos y rotacion y crea las alertas
const generar = async (req, res) => {
    try {
        const creadas = await alertas.generarAlertas();
        res.json({ mensaje: "Alertas revisadas", creadas });
    } catch (error) {
        manejarError(res, error, "generar alertas");
    }
};


module.exports = {
    getAll, getById, create, update, remove, mias, generar
};
