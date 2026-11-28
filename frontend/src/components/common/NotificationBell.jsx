//Consulta las alertas del usuario y se actualiza cada 60 segundos.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { api } from "../../services/api";

// Cada cuanto se vuelve a preguntar si hay alertas nuevas
const SEGUNDOS = 60;
export default function NotificationBell() {
    const { datos, recargar } = useApi(() => api.get("/notificaciones/mias"));
    useEffect(() => {
        const temporizador = setInterval(recargar, SEGUNDOS * 1000);
        return () => clearInterval(temporizador);
    });
    const sinLeer = (datos ?? []).filter((n) => n.estado === 0).length;
    return (
        <Link to="/notificaciones" className="campana">
            Alertas
            {sinLeer > 0 && <span className="campana-numero">{sinLeer}</span>}
        </Link>
    );
}

