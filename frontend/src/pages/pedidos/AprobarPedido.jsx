//Pagina aprobar y rechazar pedidos pendientes.

import { useState } from "react";
import { pedidos } from "../../data/datosPrueba";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";

export default function AprobarPedido() {
    const [lista, setLista] = useState(pedidos);
    const [mensaje, setMensaje] = useState("");
    function resolver(id, estado) {
        setLista(lista.map((p) => (p.id === id ? { ...p, estado } : p)));
        setMensaje("Pedido #" + id + ": " + estado);
    }
    const pendientes = lista.filter((p) => p.estado === "Pendiente");
    const columnas = [
        { clave: "id", titulo: "N.º" },
        { clave: "fecha", titulo: "Fecha" },
        { clave: "proveedor", titulo: "Proveedor" },
        { clave: "tipo", titulo: "Tipo" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (p) => <StatusBadge estado={p.estado} />,
        },
        {
            clave: "accion",
            titulo: "",
            render: (p) => (
                <div className="acciones">
                    <Button onClick={() => resolver(p.id, "Aprobado")}>
                        Aprobar
                    </Button>
                    <Button
                        variante="peligro"
                        onClick={() => resolver(p.id, "Rechazado")}
                    >
                        Rechazar
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <Card titulo="Pedidos pendientes de aprobación">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <Table
                columnas={columnas}
                filas={pendientes}
                vacio="No hay pedidos pendientes."
            />
        </Card>
    );
}

