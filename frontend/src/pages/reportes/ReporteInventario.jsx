// Pagina de Reporte de inventario por ubicación con su estado de stock.

import { inventario } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import ExportButton from "../../components/common/ExportButton";
import StockIndicator from "../../components/common/StockIndicator";

export default function ReporteInventario() {
    const columnas = [
        { clave: "codigo", titulo: "Código" },
        { clave: "producto", titulo: "Producto" },
        { clave: "ubicacion", titulo: "Ubicación" },
        { clave: "cantidad", titulo: "Cantidad" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (i) => (
                <StockIndicator stock={i.cantidad} minimo={i.minimo} />
            ),
        },
    ];
    return (
        <Card titulo="Reporte de inventario">
            <ExportButton nombre="reporte de inventario" />
            <Table columnas={columnas} filas={inventario} />
        </Card>
    );
}

