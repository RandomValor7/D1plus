// Pagina de productos agotados o con stock bajo.

import { productos } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import ExportButton from "../../components/common/ExportButton";
import StockIndicator from "../../components/common/StockIndicator";

export default function ReporteAgotados() {
    const filas = productos.filter((p) => p.stock <= p.stockMinimo);
    const columnas = [
        { clave: "codigo", titulo: "Código" },
        { clave: "nombre", titulo: "Producto" },
        { clave: "stock", titulo: "Stock" },
        { clave: "stockMinimo", titulo: "Stock mínimo" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (p) => (
                <StockIndicator stock={p.stock} minimo={p.stockMinimo} />
            ),
        },
    ];
    return (
        <Card titulo="Productos agotados o con stock bajo">
            <ExportButton nombre="reporte de agotados" />
            <Table
                columnas={columnas}
                filas={filas}
                vacio="No hay productos agotados."
            />
        </Card>
    );
}


