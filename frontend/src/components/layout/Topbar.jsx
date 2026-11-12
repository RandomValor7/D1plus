// Esto es la barra superior con el nombre del módulo, alertas, usuario y cerrar sesión.

import { useLocation, useNavigate } from "react-router-dom";
import { MENU } from "../../config/permisos";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import NotificationBell from "../common/NotificationBell";

export default function Topbar() {
    const { usuario, logout } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const modulo = MENU.find((m) => pathname.startsWith(m.base));
    function salir() {
        logout();
        navigate("/login");
    }
    return (
        <header className="topbar">
            <h2>{modulo ? modulo.etiqueta : "D1pluS"}</h2>
            <div className="topbar-usuario">
                <NotificationBell />
                <div className="topbar-datos">
                    <strong>{usuario.nombre}</strong>
                    <small>{usuario.rol}</small>
                </div>
                <Button variante="secundario" onClick={salir}>
                    Cerrar sesión
                </Button>
            </div>
        </header>
    );
}
