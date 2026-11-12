// Aqui se consulta con búsqueda y filtro por estado como se muestra en la interfaz.

import { useState } from "react";
import { pedidos } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import SearchFilter from "../../components/ui/SearchFilter";
import Select from "../../components/ui/Select";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";

const ESTADOS = ["Pendiente", "Aprobado", "Despachado", "Rechazado"];

export default function ListaPedidos() {
    const [busqueda, setBusqueda] = useState("");
    const [estado, setEstado] = useState("");
    const filas = pedidos.filter(
        (p) =>
            p.proveedor.toLowerCase().includes(busqueda.toLowerCase()) &&
            (estado === "" || p.estado === estado)
    );
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
    ];
    return (
        <Card titulo="Lista de pedidos">
            <SearchFilter
                valor={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar por proveedor..."
            >
                <Select
                    etiqueta="Estado"
                    textoVacio="Todos"
                    opciones={ESTADOS}
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
            </SearchFilter>
            <Table columnas={columnas} filas={filas} />
        </Card>
    );
}

