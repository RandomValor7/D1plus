// Registro de venta con productos y total; valida el stock (RF13).

import { useState } from "react";
import { productos } from "../../data/datosPrueba";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DetalleLineas from "../../components/common/DetalleLineas";

export default function RegistrarVenta() {
    const [lineas, setLineas] = useState([]);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    function registrar() {
        setMensaje("");
        if (lineas.length === 0) {
            setError("Agrega al menos un producto a la venta.");
            return;
        }
        for (const l of lineas) {
            const producto = productos.find((p) => p.id === l.id);
            if (producto.stock < l.cantidad) {
                setError("Stock insuficiente para " + l.nombre);
                return;
            }
        }
        setError("");
        setLineas([]);
        setMensaje("Venta registrada correctamente.");
    }
    return (
        <Card titulo="Registrar venta">
            {error && <Alert tipo="error">{error}</Alert>}
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <DetalleLineas
                productos={productos}
                lineas={lineas}
                onChange={setLineas}
            />
            <div className="acciones">
                <Button onClick={registrar}>Registrar venta</Button>
            </div>
        </Card>
    );
}

