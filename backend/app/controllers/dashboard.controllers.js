const { NotificacionModel, ReporteModel } = require("../models");
const { manejarError } = require("../utils/errores");
const { ACCESO, OPERACIONES } = require("../config/permisos");
const { aSql, rangoPeriodo } = require("../utils/fechas");

// RF31 y RF32: indicadores y permisos segun el rol del usuario
const resumen = async (req, res) => {
    try {
        const rol = req.usuario.rol;
        const hoy = rangoPeriodo("diario");
        const ventasHoy = await ReporteModel.ventas(
            aSql(hoy.desde), aSql(hoy.hasta)
        );
        const agotados = await ReporteModel.agotados();
        const porAgotarse = await ReporteModel.porAgotarse();
        const pedidos = await ReporteModel.pedidos();
        const notificaciones =
            await NotificacionModel.getByUsuario(req.usuario.id);
        const indicadores = {};
        // Las ventas solo las ven los roles que pueden vender
        if (OPERACIONES.vender.includes(rol)) {
            indicadores.ventas_del_dia = ventasHoy.reduce(
                (suma, v) => suma + Number(v.total), 0
            );
        }
        indicadores.pedidos_pendientes =
            pedidos.filter((p) => p.estado === "Pendiente").length;
        indicadores.productos_agotados = agotados.length;
        indicadores.productos_por_agotarse = porAgotarse.length;
        indicadores.alertas_sin_leer =
            notificaciones.filter((n) => n.estado === 0).length;
        // Que recursos puede consultar y modificar este rol
        const permisos = {};
        for (const [recurso, reglas] of Object.entries(ACCESO)) {
            permisos[recurso] = {
                leer: reglas.leer.includes(rol),
                escribir: reglas.escribir.includes(rol)
            };
        }
        res.json({
            rol,
            indicadores,
            stock_bajo: [...agotados, ...porAgotarse],
            permisos
        });
    } catch (error) {
        manejarError(res, error, "consultar dashboard");
    }
};

module.exports = { resumen };


