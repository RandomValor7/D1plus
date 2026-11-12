// mensaje de alerta con 3 variantes: info, exito y error. Se puede usar para mostrar mensajes de información, éxito o error al usuario.

export default function Alert({ tipo = "info", children }) {
    return <div className={"alerta alerta-" + tipo}>{children}</div>;
}

