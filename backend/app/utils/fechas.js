const dos = (n) => String(n).padStart(2, "0");
const aSql = (f) =>
    f.getFullYear() + "-" + dos(f.getMonth() + 1) + "-" +
    dos(f.getDate()) + " " + dos(f.getHours()) + ":" +
    dos(f.getMinutes()) + ":" + dos(f.getSeconds());

// Solo el dia
const aDia = (f) => aSql(f).slice(0, 10);
const inicioDelDia = (f) =>
    new Date(f.getFullYear(), f.getMonth(), f.getDate());
const sumarDias = (f, dias) => {
    const nueva = new Date(f);
    nueva.setDate(nueva.getDate() + dias);
    return nueva;
};

// Lee "2026-11-26" y devuelve una fecha, o null si no es valida
const leerFecha = (texto) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto ?? "");
    if (!m) {
        return null;
    }
    const f = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return aDia(f) === texto ? f : null;
};

// Rango [desde, hasta) del dia, la semana (lunes a domingo) o el mes
const rangoPeriodo = (periodo, referencia = new Date()) => {
    const dia = inicioDelDia(referencia);
    if (periodo === "diario") {
        return { desde: dia, hasta: sumarDias(dia, 1) };
    }
    if (periodo === "semanal") {
        const lunes = sumarDias(dia, -((dia.getDay() + 6) % 7));
        return { desde: lunes, hasta: sumarDias(lunes, 7) };
    }
    if (periodo === "mensual") {
        return {
            desde: new Date(dia.getFullYear(), dia.getMonth(), 1),
            hasta: new Date(dia.getFullYear(), dia.getMonth() + 1, 1)
        };
    }
    return null;
};

module.exports = {
    aSql,
    aDia,
    sumarDias,
    leerFecha,
    rangoPeriodo
};
