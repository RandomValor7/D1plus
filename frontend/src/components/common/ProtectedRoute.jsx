// Si no hay sesión envía al login; si el rol no tiene permiso, muestra un aviso (RF03 y RF32).

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Alert from "../ui/Alert";

// sin sesión: redirige a login; sin permiso: muestra alerta; con permiso: renderiza children
// con sesión y permiso: renderiza children; sin sesión: redirige a login; sin permiso: muestra alerta
export default function ProtectedRoute({ roles, children }) {
    const { usuario } = useAuth();
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }
    if (roles && !roles.includes(usuario.rol)) {
        return (
            <Alert tipo="error">
                No tienes permiso para ver esta pantalla.
            </Alert>
        );
    }
    return children;
}

