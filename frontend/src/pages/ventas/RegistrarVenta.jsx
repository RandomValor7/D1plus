// Registro de venta con productos y total; valida el stock (RF13).

import { useState } from "react";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import { formatoPesos } from "../../utils/formato";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Carga from "../../components/ui/Carga";
import DetalleLineas from "../../components/common/DetalleLineas";

export default function RegistrarVenta() {
    const { datos, cargando, error } = useApi(() => api.get("/productos"));
    const [lineas, setLineas] = useState([]);
    const [errorApi, setErrorApi] = useState("");
    const [mensaje, setMensaje] = useState("");
    async function registrar() {
        setMensaje("");
        if (lineas.length === 0) {
            setErrorApi("Agrega al menos un producto a la venta.");
            return;
        }
        try {
            const respuesta = await api.post("/ventas/registrar", {
                lineas: lineas.map((l) => ({
                    id_producto: l.id,
                    cantidad: l.cantidad,
                })),
            });
            setErrorApi("");
            setLineas([]);
            setMensaje(
                "Venta #" + respuesta.id + " registrada por " +
                formatoPesos(respuesta.total)
            );
        } catch (err) {
            // Por ejemplo: Stock insuficiente para (producto)
            setErrorApi(err.message);
        }
    }
    return (
        <Carga cargando={cargando} error={error}>
            <Card titulo="Registrar venta">
                {errorApi && <Alert tipo="error">{errorApi}</Alert>}
                {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
                <DetalleLineas
                    productos={datos ?? []}
                    lineas={lineas}
                    onChange={setLineas}
                />
                <div className="acciones">
                    <Button onClick={registrar}>Registrar venta</Button>
                </div>
            </Card>
        </Carga>
    );
}

