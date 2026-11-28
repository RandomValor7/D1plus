// Pagina de indicadores y productos con stock bajo; los indicadores cambian según el rol.

import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import { formatoPesos } from "../../utils/formato";
import Card from "../../components/ui/Card";
import Carga from "../../components/ui/Carga";
import Table from "../../components/ui/Table";
import KpiCard from "../../components/common/KpiCard";
import StockIndicator from "../../components/common/StockIndicator";

export default function DashboardPrincipal() {
    const { usuario } = useAuth();
    const { datos, cargando, error } = useApi(() => api.get("/dashboard"));
    // La API ya manda solo los indicadores que este rol puede ver
    const i = datos?.indicadores ?? {};
    const kpis = [
        {
            titulo: "Ventas del día",
            valor: formatoPesos(i.ventas_del_dia ?? 0),
            color: "azul",
            visible: "ventas_del_dia" in i,
        },
        {
            titulo: "Pedidos pendientes",
            valor: i.pedidos_pendientes,
            color: "amarillo",
            visible: true,
        },
        {
            titulo: "Productos agotados",
            valor: i.productos_agotados,
            color: "rojo",
            visible: true,
        },
        {
            titulo: "Alertas sin leer",
            valor: i.alertas_sin_leer,
            color: "verde",
            visible: true,
        },
    ].filter((k) => k.visible);
    const columnas = [
        { clave: "nombre", titulo: "Producto" },
        { clave: "stock", titulo: "Stock" },
        { clave: "stock_minimo", titulo: "Mínimo" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (p) => (
                <StockIndicator stock={p.stock} minimo={p.stock_minimo} />
            ),
        },
    ];
    return (
        <>
            <h1 className="titulo-pantalla">Hola, {usuario.nombre}</h1>
            <Carga cargando={cargando} error={error}>
                <div className="kpis">
                    {kpis.map((k) => (
                        <KpiCard
                            key={k.titulo}
                            titulo={k.titulo}
                            valor={k.valor}
                            color={k.color}
                        />
                    ))}
                </div>
                <Card titulo="Productos con stock bajo">
                    <Table
                        columnas={columnas}
                        filas={datos?.stock_bajo ?? []}
                        vacio="Ningún producto con stock bajo."
                    />
                </Card>
            </Carga>
        </>
    );
}
