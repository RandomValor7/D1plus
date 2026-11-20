const faltanCampos = (res, datos, requeridos) => {
    const faltan = requeridos.filter((campo) => {
        const valor = datos?.[campo];
        return valor === undefined || valor === "";
    });
    if (faltan.length === 0) {
        return false;
    }
    res.status(400).json({
        mensaje: "Faltan campos: " + faltan.join(", ")
    });
    return true;
};

const manejarError = (res, error, accion) => {
    console.error(error);
    const conocidos = {
        ER_DUP_ENTRY: [409, "Ya existe un registro igual"],
        ER_NO_REFERENCED_ROW_2: [400, "Un id enviado no existe"],
        ER_CHECK_CONSTRAINT_VIOLATED: [400, "Datos no validos"],
        ER_ROW_IS_REFERENCED_2: [
            409, "No se puede eliminar: tiene registros relacionados"
        ]
    };
    const [estado, mensaje] = conocidos[error.code]
        ?? [500, "Error al " + accion];
    res.status(estado).json({ mensaje });
};

const sinCambios = (res, datos, editables) => {
    const hayAlguno = editables.some(
        (campo) => datos?.[campo] !== undefined
    );
    if (hayAlguno) {
        return false;
    }
    res.status(400).json({
        mensaje: "Envie al menos un campo: " + editables.join(", ")
    });
    return true;
};

module.exports = { faltanCampos, manejarError, sinCambios };
