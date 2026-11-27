const test = require("node:test");
const assert = require("node:assert");
const { unirLineas, enteroPositivo } = require("../app/utils/lineas");

const {
    aSql, aDia, leerFecha, rangoPeriodo, sumarDias
} = require("../app/utils/fechas");
const { agruparVentas, clasificarRotacion } =
    require("../app/utils/reportes");
test("unirLineas rechaza una lista vacia", () => {
    assert.ok(unirLineas([]).error);
    assert.ok(unirLineas(undefined).error);
});

test("unirLineas rechaza cantidades invalidas", () => {
    assert.ok(unirLineas([{ id_producto: 1, cantidad: 0 }]).error);
    assert.ok(unirLineas([{ id_producto: 1, cantidad: 2.5 }]).error);
    assert.ok(unirLineas([{ id_producto: "a", cantidad: 1 }]).error);
});

test("unirLineas suma los productos repetidos y ordena", () => {
    const { lineas } = unirLineas([
        { id_producto: 5, cantidad: 2 },
        { id_producto: 1, cantidad: 1 },
        { id_producto: 5, cantidad: 3 }
    ]);
    assert.deepStrictEqual(lineas, [
        { id_producto: 1, cantidad: 1 },
        { id_producto: 5, cantidad: 5 }
    ]);
});

test("enteroPositivo acepta numeros y textos validos", () => {
    assert.strictEqual(enteroPositivo(5), true);
    assert.strictEqual(enteroPositivo("12"), true);
    assert.strictEqual(enteroPositivo(0), false);
    assert.strictEqual(enteroPositivo(-3), false);
    assert.strictEqual(enteroPositivo("abc"), false);
});

test("aSql da el formato de MySQL", () => {
    const f = new Date(2026, 10, 5, 9, 7, 3);
    assert.strictEqual(aSql(f), "2026-11-05 09:07:03");
    assert.strictEqual(aDia(f), "2026-11-05");
});

test("leerFecha valida el formato AAAA-MM-DD", () => {
    assert.strictEqual(aDia(leerFecha("2026-11-26")), "2026-11-26");
    assert.strictEqual(leerFecha("26/11/2026"), null);
    assert.strictEqual(leerFecha("2026-02-30"), null);
});

test("rangoPeriodo diario cubre un solo dia", () => {
    const { desde, hasta } = rangoPeriodo("diario", new Date(2026, 10, 26));
    assert.strictEqual(aDia(desde), "2026-11-26");
    assert.strictEqual(aDia(hasta), "2026-11-27");
});

test("rangoPeriodo semanal va de lunes a domingo", () => {
    // 26 de noviembre de 2026 es jueves
    const jueves = new Date(2026, 10, 26);
    const { desde, hasta } = rangoPeriodo("semanal", jueves);
    assert.strictEqual(aDia(desde), "2026-11-23");
    assert.strictEqual(aDia(sumarDias(hasta, -1)), "2026-11-29");
});

test("rangoPeriodo mensual cubre el mes completo", () => {
    const dia = new Date(2026, 10, 26);
    const { desde, hasta } = rangoPeriodo("mensual", dia);
    assert.strictEqual(aDia(desde), "2026-11-01");
    assert.strictEqual(aDia(hasta), "2026-12-01");
});

test("rangoPeriodo rechaza un periodo desconocido", () => {
    assert.strictEqual(rangoPeriodo("anual"), null);
});

test("agruparVentas suma por dia y ordena", () => {
    const filas = agruparVentas([
        { fecha_venta: "2026-11-11 08:30:00", total: 25000 },
        { fecha_venta: "2026-11-10 09:15:00", total: 14000 },
        { fecha_venta: "2026-11-10 11:40:00", total: 36000 }
    ]);
    assert.deepStrictEqual(filas, [
        { fecha: "2026-11-10", ventas: 2, total: 50000 },
        { fecha: "2026-11-11", ventas: 1, total: 25000 }
    ]);
});

test("clasificarRotacion usa los limites de reglas.js", () => {
    assert.strictEqual(clasificarRotacion(150), "Alta");
    assert.strictEqual(clasificarRotacion(50), "Media");
    assert.strictEqual(clasificarRotacion(5), "Baja");
});

