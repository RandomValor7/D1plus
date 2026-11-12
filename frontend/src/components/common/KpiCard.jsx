// Esto es la Tarjeta de indicador del dashboard (RF31).

export default function KpiCard({ titulo, valor, color = "azul" }) {
    return (
        <div className={"kpi kpi-" + color}>
            <span className="kpi-titulo">{titulo}</span>
            <strong className="kpi-valor">{valor}</strong>
        </div>
    );
}
