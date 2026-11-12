// Pagina de historial de ventas, pedidos y devoluciones (RF38 y RF39).

import { useState } from "react";
import { historialOperaciones } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import SearchFilter from "../../components/ui/SearchFilter";
import Select from "../../components/ui/Select";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";

const TIPOS = ["Venta", "Pedido", "Devolución"];

export default function HistorialOperaciones() {
    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState("");
    const filas = historialOperaciones.filter(
        (h) =>
            h.referencia.toLowerCase().includes(busqueda.toLowerCase()) &&
            (tipo === "" || h.tipo === tipo)
    );
    const columnas = [
        { clave: "tipo", titulo: "Tipo" },
        { clave: "referencia", titulo: "Referencia" },
        { clave: "fecha", titulo: "Fecha" },
        { clave: "usuario", titulo: "Usuario" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (h) => <StatusBadge estado={h.estado} />,
        },
    ];
    return (
        <Card titulo="Historial de ventas, pedidos y devoluciones">
            <SearchFilter
                valor={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar por referencia..."
            >
                <Select
                    etiqueta="Tipo"
                    textoVacio="Todos"
                    opciones={TIPOS}
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
            </SearchFilter>
            <Table columnas={columnas} filas={filas} />
        </Card>
    );
}
