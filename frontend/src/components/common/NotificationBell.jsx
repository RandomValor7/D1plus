// Esto es para el enlace de alertas con el número de notificaciones sin leer (RF33 a RF36).

import { Link } from "react-router-dom";
import { notificaciones } from "../../data/datosPrueba";

export default function NotificationBell() {
    const sinLeer = notificaciones.filter((n) => !n.leida).length;
    return (
        <Link to="/notificaciones" className="campana">
            Alertas
            {sinLeer > 0 && <span className="campana-numero">{sinLeer}</span>}
        </Link>
    );
}

