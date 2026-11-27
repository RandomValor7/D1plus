const { aDia } = require("./fechas");
const reglas = require("../config/reglas");

// Agrupa ventas por dia
const agruparVentas = (ventas) => {
    const porDia = {};
    for (const venta of ventas) {
        const dia = aDia(new Date(venta.fecha_venta));
        porDia[dia] ??= { fecha: dia, ventas: 0, total: 0 };
        porDia[dia].ventas += 1;
        porDia[dia].total += Number(venta.total);
    }
    return Object.values(porDia).sort((a, b) =>
        a.fecha.localeCompare(b.fecha)
    );
};

// Rotacion segun las unidades vendidas en el periodo (RF29)
const clasificarRotacion = (unidades) => {
    if (unidades >= reglas.ROTACION_ALTA) {
        return "Alta";
    }
    if (unidades >= reglas.ROTACION_MEDIA) {
        return "Media";
    }
    return "Baja";
};

module.exports = { agruparVentas, clasificarRotacion };

