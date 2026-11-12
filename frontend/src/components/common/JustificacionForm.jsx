// Este componente es para el campo de justificación, usado al anular ventas (RF14) y al actualizar el inventario.

import { useState } from "react";
import Button from "../ui/Button";

export default function JustificacionForm({
    etiqueta = "Justificación",
    textoBoton = "Confirmar",
    onConfirmar,
    onCancelar,
}) {
    const [texto, setTexto] = useState("");
    const [error, setError] = useState("");
    function enviar(e) {
        e.preventDefault();
        if (texto.trim() === "") {
            setError("La justificación es obligatoria.");
            return;
        }
        onConfirmar(texto.trim());
        setTexto("");
        setError("");
    }
    return (
        <form onSubmit={enviar}>
            <div className="campo">
                <label>{etiqueta}</label>
                <textarea
                    rows="4"
                    className={error ? "invalido" : ""}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                {error && <span className="campo-error">{error}</span>}
            </div>
            <div className="acciones">
                {onCancelar && (
                    <Button variante="secundario" onClick={onCancelar}>
                        Cancelar
                    </Button>
                )}
                <Button type="submit">{textoBoton}</Button>
            </div>
        </form>
    );
}


