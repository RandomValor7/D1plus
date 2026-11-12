// lista de ventas con botón Anular que sirve para gestionar (RF14 y RF39).

import { useState } from "react";
import { ventas } from "../../data/datosPrueba";
import { formatoPesos } from "../../utils/formato";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";
import AnularVentaModal from "./AnularVentaModal";

export default function HistorialVentas() {
    const [lista, setLista] = useState(ventas);
    const [seleccionada, setSeleccionada] = useState(null);
    const [mensaje, setMensaje] = useState("");
    function anular(id, justificacion) {
        setLista(
            lista.map((v) => (v.id === id ? { ...v, estado: "Anulada" } : v))
        );
        setSeleccionada(null);
        setMensaje("Venta #" + id + " anulada. Motivo: " + justificacion);
    }
    const columnas = [
        { clave: "id", titulo: "N.º" },
        { clave: "fecha", titulo: "Fecha" },
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
            <Table columnas={columnas} filas={lista} />
            <AnularVentaModal
                venta={seleccionada}
                onCerrar={() => setSeleccionada(null)}
                onAnular={anular}
            />
        </Card>
    );
}

