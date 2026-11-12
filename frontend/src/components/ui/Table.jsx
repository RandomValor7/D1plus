// tabla con columnas y filas. Si no hay filas, muestra un mensaje de vacío.

export default function Table({
    columnas,
    filas,
    vacio = "No hay registros.",
}) {
    if (filas.length === 0) {
        return <p className="vacio">{vacio}</p>;
    }
    return (
        <div className="tabla-contenedor">
            <table className="tabla">
                <thead>
                    <tr>
                        {columnas.map((c) => (
                            <th key={c.clave}>{c.titulo}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filas.map((fila, i) => (
                        <tr key={fila.id ?? i}>
                            {columnas.map((c) => (
                                <td key={c.clave}>
                                    {c.render ? c.render(fila) : fila[c.clave]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



