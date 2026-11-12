// Ventana para anular una venta con justificación (RF14).

import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";
import JustificacionForm from "../../components/common/JustificacionForm";

// venta === null significa que el modal está cerrado

export default function AnularVentaModal({ venta, onCerrar, onAnular }) {
    return (
        <Modal
            abierto={venta !== null}
            titulo={venta ? "Anular venta #" + venta.id : ""}
            onCerrar={onCerrar}
        >
            <Alert tipo="advertencia">
                La venta pasará al estado Anulada. Debes indicar el motivo.
            </Alert>
            <JustificacionForm
                etiqueta="Justificación de la anulación"
                textoBoton="Anular venta"
                onCancelar={onCerrar}
                onConfirmar={(texto) => onAnular(venta.id, texto)}
            />
        </Modal>
    );
}

