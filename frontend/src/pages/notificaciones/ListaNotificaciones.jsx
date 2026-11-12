// Alertas con el botón Marcar como leída.

import { useState } from "react";
import { notificaciones } from "../../data/datosPrueba";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";

export default function ListaNotificaciones() {
    const [lista, setLista] = useState(notificaciones);
    function marcarLeida(id) {
        setLista(lista.map((n) => (n.id === id ? { ...n, leida: true } : n)));
    }
    const columnas = [
        { clave: "tipo", titulo: "Tipo" },
        { clave: "mensaje", titulo: "Mensaje" },
        { clave: "fecha", titulo: "Fecha" },
        {
            clave: "leida",
            titulo: "Estado",
            render: (n) => (n.leida ? "Leída" : "Sin leer"),
        },
        {
            clave: "accion",
            titulo: "",
            render: (n) =>
                !n.leida && (
                    <Button variante="secundario" onClick={() => marcarLeida(n.id)}>
                        Marcar como leída
                    </Button>
                ),
        },
    ];
    return (
        <Card titulo="Notificaciones">
            <Table columnas={columnas} filas={lista} />
        </Card>
    );
}

