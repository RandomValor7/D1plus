// Esto devuelve un objeto con los errores de validación para los campos obligatorios

export function validarObligatorios(form, campos) {
    const errores = {};
    campos.forEach((campo) => {
        if (String(form[campo]).trim() === "") {
            errores[campo] = "Campo obligatorio";
        }
    });
    return errores;
}
