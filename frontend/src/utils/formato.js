// Con esto miro los valores en pesos colombianos y los formateo con el símbolo de pesos y la coma como separador de miles

export function formatoPesos(valor) {
    return "$" + valor.toLocaleString("es-CO");
}
