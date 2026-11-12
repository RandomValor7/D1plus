//Pantalla para consulta con búsqueda.

import { useState } from "react";
import { proveedores } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import SearchFilter from "../../components/ui/SearchFilter";
import Table from "../../components/ui/Table";

const COLUMNAS = [
    { clave: "nit", titulo: "NIT" },
    { clave: "nombre", titulo: "Nombre" },
    { clave: "telefono", titulo: "Teléfono" },
    { clave: "correo", titulo: "Correo" },
    { clave: "direccion", titulo: "Dirección" },
];

export default function ListaProveedores() {
    const [busqueda, setBusqueda] = useState("");
    const filas = proveedores.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    return (
        <Card titulo="Lista de proveedores">
            <SearchFilter
                valor={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar proveedor..."
            />
            <Table columnas={COLUMNAS} filas={filas} />
        </Card>
    );
}

