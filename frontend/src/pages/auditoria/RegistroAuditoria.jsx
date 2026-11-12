// Pagina de registro de auditoría de las acciones de los usuarios con búsqueda (RF37).

import { useState } from "react";
import { auditoria } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import SearchFilter from "../../components/ui/SearchFilter";
import Table from "../../components/ui/Table";

const COLUMNAS = [
    { clave: "fecha", titulo: "Fecha" },
    { clave: "usuario", titulo: "Usuario" },
    { clave: "accion", titulo: "Acción" },
    { clave: "descripcion", titulo: "Descripción" },
];

export default function RegistroAuditoria() {
    const [busqueda, setBusqueda] = useState("");
    const texto = busqueda.toLowerCase();
    const filas = auditoria.filter(
        (a) =>
            a.usuario.toLowerCase().includes(texto) ||
            a.accion.toLowerCase().includes(texto)
    );
    return (
        <Card titulo="Registro de auditoría">
            <SearchFilter
                valor={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar por usuario o acción..."
            />
            <Table columnas={COLUMNAS} filas={filas} />
        </Card>
    );
}
