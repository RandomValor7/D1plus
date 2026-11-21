const { VentaModel } = require("../models");
const { faltanCampos, manejarError } =
    require("../utils/errores");

const getAll = async (req, res) => {
    try {
        const datos = await VentaModel.getAll();
        res.json(datos);
    } catch (error) {
        manejarError(res, error, "consultar venta");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await VentaModel.getById(id);
        if (!dato) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        res.json(dato);
    } catch (error) {
        manejarError(res, error, "consultar venta");
    }
};

const create = async (req, res) => {
    try {
        const requeridos = ["total", "id_usuario"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const id = await VentaModel.create(req.body);
        res.status(201).json({
            mensaje: "Registro creado",
            id
        });
    } catch (error) {
        manejarError(res, error, "crear en venta");
    }
};

const anular = async (req, res) => {
    try {
        const { id } = req.params;
        const requeridos = ["id_usuario", "justificacion"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const { id_usuario, justificacion } = req.body;
        if (String(justificacion).length > 200) {
            return res.status(400).json({
                mensaje: "La justificacion no puede superar 200 letras"
            });
        }
        const existente = await VentaModel.getById(id);
        if (!existente) {
            return res.status(404).json({
                mensaje: "Registro no encontrado"
            });
        }
        if (existente.estado === "Anulada") {
            return res.status(409).json({
                mensaje: "La venta ya esta anulada"
            });
        }
        await VentaModel.anular(id, id_usuario, justificacion);
        res.json({ mensaje: "Venta anulada" });
    } catch (error) {
        manejarError(res, error, "anular en venta");
    }
};

module.exports = { getAll, getById, create, anular };

