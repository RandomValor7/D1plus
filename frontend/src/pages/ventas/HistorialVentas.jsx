// lista de ventas con botón Anular que sirve para gestionar (RF14 y RF39).

import { useState } from "react";
import { ACCESO } from "../../config/permisos";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import { formatoPesos } from "../../utils/formato";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Carga from "../../components/ui/Carga";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";
import AnularVentaModal from "./AnularVentaModal";

export default function HistorialVentas() {
    const { usuario } = useAuth();
    const { datos, cargando, error, recargar } = useApi(() =>
        api.get("/ventas")
    );
    const [seleccionada, setSeleccionada] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [errorApi, setErrorApi] = useState("");
    // Solo administrador y gerente pueden anular (RF14)
    const puedeAnular = ACCESO.anularVentas.includes(usuario.rol);
    async function anular(id, justificacion) {
        etMensaje("");
        setErrorApi("");
        try {
            await api.patch("/ventas/" + id + "/anular", {
                id_usuario: usuario.id_usuario,
                justificacion,
            });
            setSeleccionada(null);
            setMensaje("Venta #" + id + " anulada. Motivo: " + justificacion);
            recargar();
        } catch (err) {
            setSeleccionada(null);
            setErrorApi(err.message);
        }
    }
    const columnas = [
        { clave: "id_venta", titulo: "N.º" },
        { clave: "fecha_venta", titulo: "Fecha" },
        { clave: "vendedor", titulo: "Vendedor" },
        {
            clave: "total",
            titulo: "Total",
            render: (v) => formatoPesos(v.total),
        },
        {
            clave: "estado",
            titulo: "Estado",
            render: (v) => <StatusBadge estado={v.estado} />,
        },
        {
            clave: "accion",
            titulo: "",
            render: (v) =>
                puedeAnular &&
                v.estado === "Completada" && (
                    <Button variante="peligro" onClick={() => setSeleccionada(v)}>
                        Anular
                    </Button>
                ),
        },
    ];
    return (
        <Card titulo="Historial de ventas">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            {errorApi && <Alert tipo="error">{errorApi}</Alert>}
            <Carga cargando={cargando} error={error}>
                <Table columnas={columnas} filas={datos ?? []} />
            </Carga>
            <AnularVentaModal
                venta={seleccionada}
                onCerrar={() => setSeleccionada(null)}
                onAnular={anular}
            />
        </Card>
    );
}

