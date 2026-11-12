// Estos son los botones de exportar a PDF y Excel (RF30). Aquí solo es simulado, no se hace la exportación real.

import { useState } from "react";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

export default function ExportButton({ nombre }) {
    const [mensaje, setMensaje] = useState("");
    return (
        <div>
            <div className="acciones">
                <Button
                    variante="secundario"
                    onClick={() => setMensaje("Exportando " + nombre + " a PDF...")}
                >
                    Exportar PDF
                </Button>
                <Button
                    variante="secundario"
                    onClick={() => setMensaje("Exportando " + nombre + " a Excel...")}
                >
                    Exportar Excel
                </Button>
            </div>
            {mensaje && <Alert tipo="info">{mensaje} (simulado)</Alert>}
        </div>
    );
}


