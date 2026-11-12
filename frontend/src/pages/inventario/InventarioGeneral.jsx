// Aqui se consulta con búsqueda y filtro por tienda o bodega (RF06 y RF07).

import { useState } from "react";
import { inventario, ubicaciones } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import SearchFilter from "../../components/ui/SearchFilter";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";
import StockIndicator from "../../components/common/StockIndicator";

export default function InventarioGeneral() {
    const [busqueda, setBusqueda] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const filas = inventario.filter(
        (i) =>
            i.producto.toLowerCase().includes(busqueda.toLowerCase()) &&
            (ubicacion === "" || i.ubicacion === ubicacion)
    );
    const columnas = [
        { clave: "codigo", titulo: "Código" },
        { clave: "producto", titulo: "Producto" },
        { clave: "ubicacion", titulo: "Ubicación" },
        { clave: "cantidad", titulo: "Cantidad" },
        { clave: "minimo", titulo: "Mínimo" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (i) => (
                <StockIndicator stock={i.cantidad} minimo={i.minimo} />
            ),
        },
    ];
    return (
        <Card titulo="Inventario general">
            <SearchFilter
                valor={busqueda}
                onChange={setBusqueda}
                placeholder="Buscar producto..."
            >
                <Select
                    etiqueta="Tienda o bodega"
                    textoVacio="Todas"
                    opciones={ubicaciones}
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                />
            </SearchFilter>
            <Table columnas={columnas} filas={filas} />
        </Card>
    );
}

