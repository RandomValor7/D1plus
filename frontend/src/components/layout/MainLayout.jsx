// Aqui se une Sidebar, Topbar y el contenido, y activa el cierre por inactividad.

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useIdleTimer from "../../hooks/useIdleTimer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Minutos de inactividad antes de cerrar la sesión con posibilidad de modificacion (RF05)

const MINUTOS_INACTIVIDAD = 15;

// Estructura de las pantallas internas

export default function MainLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useIdleTimer(MINUTOS_INACTIVIDAD, () => {
        logout();
        navigate("/login");
    });
    return (
        <div className="layout">
            <Sidebar />
            <div className="layout-principal">
                <Topbar />
                <main className="contenido">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

