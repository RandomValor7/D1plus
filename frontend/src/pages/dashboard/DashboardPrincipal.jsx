// Pagina de indicadores y productos con stock bajo; los indicadores cambian según el rol.
import { ACCESO } from "../../config/permisos";
import { useAuth } from "../../context/AuthContext";
import {
    notificaciones,
    pedidos,
    productos,
    ventas,
} from "../../data/datosPrueba";
import { formatoPesos } from "../../utils/formato";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import KpiCard from "../../components/common/KpiCard";
import StockIndicator from "../../components/common/StockIndicator";

export default function DashboardPrincipal() {
    const { usuario } = useAuth();
    const totalVentas = ventas
        .filter((v) => v.estado === "Completada")
        .reduce((suma, v) => suma + v.total, 0);
    // Cada indicador indica qué roles lo ven (RF31 y RF32)
    const kpis = [
        {
            titulo: "Ventas registradas",
            valor: formatoPesos(totalVentas),
            color: "azul",
            roles: ACCESO.ventas,
        },
        {
            titulo: "Pedidos pendientes",
            valor: pedidos.filter((p) => p.estado === "Pendiente").length,
            color: "amarillo",
            roles: ACCESO.pedidos,
        },
        {
            titulo: "Productos agotados",
            valor: productos.filter((p) => p.stock === 0).length,
            color: "rojo",
            roles: ACCESO.inventario,
        },
        {
            titulo: "Alertas sin leer",
            valor: notificaciones.filter((n) => !n.leida).length,
            color: "verde",
            roles: ACCESO.todos,
        },
    ].filter((k) => k.roles.includes(usuario.rol));
    const stockBajo = productos.filter((p) => p.stock <= p.stockMinimo);
    const columnas = [
        { clave: "nombre", titulo: "Producto" },
        { clave: "stock", titulo: "Stock" },
        { clave: "stockMinimo", titulo: "Mínimo" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (p) => (
                <StockIndicator stock={p.stock} minimo={p.stockMinimo} />
            ),
        },
    ];
    return (
        <>
            <h1 className="titulo-pantalla">Hola, {usuario.nombre}</h1>
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
                <Table columnas={columnas} filas={stockBajo} />
            </Card>
        </>
    );
}

