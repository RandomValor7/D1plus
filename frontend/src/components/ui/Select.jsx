// Opciones como lista de textos o de objetos { valor, texto }

export default function Select({
    etiqueta,
    opciones,
    error,
    textoVacio = "Seleccione...",
    ...resto
}) {
    return (
        <div className="campo">
            <label>{etiqueta}</label>
            <select className={error ? "invalido" : ""} {...resto}>
                <option value="">{textoVacio}</option>
                {opciones.map((o) => (
                    <option key={o.valor ?? o} value={o.valor ?? o}>
                        {o.texto ?? o}
                    </option>
                ))}
            </select>
            {error && <span className="campo-error">{error}</span>}
        </div>
    );
}

