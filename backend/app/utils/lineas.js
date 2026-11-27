//Valida las líneas de una venta o un pedido y 
//suma las repetidas. enteroPositivo valida cantidades.

const unirLineas = (lineas) => {
    if (!Array.isArray(lineas) || lineas.length === 0) {
        return { error: "Envie al menos una linea" };
    }
    const unidas = new Map();
    for (const linea of lineas) {
        const id = Number(linea?.id_producto);
        const cantidad = Number(linea?.cantidad);
        if (!Number.isInteger(id) || id <= 0 ||
            !Number.isInteger(cantidad) || cantidad <= 0) {
            return {
                error: "Cada linea necesita id_producto y " +
                    "cantidad enteros mayores a 0"
            };
        }
        unidas.set(id, (unidas.get(id) ?? 0) + cantidad);
    }
    const resultado = [...unidas]
        .map(([id_producto, cantidad]) => ({ id_producto, cantidad }))
        .sort((a, b) => a.id_producto - b.id_producto);
    return { lineas: resultado };
};

// "5" o 5 -> true. 0, -3, 2.5 o "abc" -> false
const enteroPositivo = (valor) =>
    /^\d+$/.test(String(valor)) && Number(valor) > 0;

module.exports = { unirLineas, enteroPositivo };

