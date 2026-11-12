// Pagina de rotacion de productos, como alta, media, baja.

import { rotacion } from "../../data/datosPrueba";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";
import ExportButton from "../../components/common/ExportButton";

export default function ReporteRotacion() {
    const columnas = [
        { clave: "producto", titulo: "Producto" },
        { clave: "vendidas", titulo: "Unidades vendidas" },
        {
            clave: "nivel",
            titulo: "Rotación",
            render: (r) => <StatusBadge estado={r.nivel} />,
        },
    ];
    return (
        <Card titulo="Rotación de productos">
            <ExportButton nombre="reporte de rotación" />
            <Table columnas={columnas} filas={rotacion} />
        </Card>
    );
}



