// ------Con esto miro los valores en pesos colombianos y los formateo con el símbolo de pesos y la coma como separador de miles-----
// MySQL entrega los precios como texto ("2800.00"): se convierten

export function formatoPesos(valor) {
    return "$" + Number(valor).toLocaleString("es-CO");
}
