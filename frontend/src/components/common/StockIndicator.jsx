// Esto permite marcar el stock como Agotado, Stock bajo o Normal con la misma regla de la base de datos: stock
// menor o igual al mínimo (RF33).

import StatusBadge from "../ui/StatusBadge";

export default function StockIndicator({ stock, minimo }) {
    if (stock === 0) {
        return <StatusBadge estado="Agotado" />;
    }
    if (stock <= minimo) {
        return <span className="badge badge-amarillo">Stock bajo</span>;
    }
    return <span className="badge badge-verde">Normal</span>;
}


