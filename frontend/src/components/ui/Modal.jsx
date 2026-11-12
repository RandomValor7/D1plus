// Ventana emergente modal. Permite mostrar contenido en una ventana flotante sobre la interfaz principal.

export default function Modal({ abierto, titulo, onCerrar, children }) {
    if (!abierto) return null;
    return (
        <div className="modal-fondo" onClick={onCerrar}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-cabecera">
                    <h3>{titulo}</h3>
                    <button
                        type="button"
                        className="modal-cerrar"
                        onClick={onCerrar}
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

