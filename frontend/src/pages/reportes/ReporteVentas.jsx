// Pagina de ventas con el total vendido y exportación.

import { ventas } from "../../data/datosPrueba";
import { formatoPesos } from "../../utils/formato";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";
import ExportButton from "../../components/common/ExportButton";

export default function ReporteVentas() {
    const completadas = ventas.filter((v) => v.estado === "Completada");
    const total = completadas.reduce((suma, v) => suma + v.total, 0);
    const columnas = [
        { clave: "id", titulo: "N.º" },
        { clave: "fecha", titulo: "Fecha" },
        { clave: "vendedor", titulo: "Vendedor" },
        {
            clave: "total",
            titulo: "Total",
            render: (v) => formatoPesos(v.total),
        },
        {
            clave: "estado",
            titulo: "Estado",
            render: (v) => <StatusBadge estado={v.estado} />,
        },
    ];
    return (
        <Card titulo="Reporte de ventas">
            <ExportButton nombre="reporte de ventas" />
            <Table columnas={columnas} filas={ventas} />
            <p className="total">Total vendido: {formatoPesos(total)}</p>
        </Card>
    );
}

