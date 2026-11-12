// Pagina para despachar pedidos aprobados.

import { useState } from "react";
import { pedidos } from "../../data/datosPrueba";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";

export default function DespacharPedido() {
    const [lista, setLista] = useState(pedidos);
    const [mensaje, setMensaje] = useState("");
    function despachar(id) {
        setLista(
            lista.map((p) => (p.id === id ? { ...p, estado: "Despachado" } : p))
        );
        setMensaje("Pedido #" + id + " despachado.");
    }
    const aprobados = lista.filter((p) => p.estado === "Aprobado");
    const columnas = [
        { clave: "id", titulo: "N.º" },
        { clave: "fecha", titulo: "Fecha" },
        { clave: "proveedor", titulo: "Proveedor" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (p) => <StatusBadge estado={p.estado} />,
        },
        {
            clave: "accion",
            titulo: "",
            render: (p) => (
                <Button onClick={() => despachar(p.id)}>Despachar</Button>
            ),
        },
    ];
    return (
        <Card titulo="Pedidos aprobados por despachar">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <Table
                columnas={columnas}
                filas={aprobados}
                vacio="No hay pedidos aprobados por despachar."
            />
        </Card>
    );
}

