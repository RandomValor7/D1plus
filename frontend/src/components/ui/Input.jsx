// campo de texto con la etiqueta con mensaje de error para los campos de formulario.

export default function Input({ etiqueta, error, ...resto }) {
    return (
        <div className="campo">
            <label>{etiqueta}</label>
            <input className={error ? "invalido" : ""} {...resto} />
            {error && <span className="campo-error">{error}</span>}
        </div>
    );
}


