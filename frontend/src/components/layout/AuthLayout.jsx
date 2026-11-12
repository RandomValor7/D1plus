// Tarjeta centrada con el logo, para Login y Recuperar contraseña.

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="auth-fondo">
            <div className="auth-tarjeta">
                <div className="logo logo-centro">D1pluS</div>
                <Outlet />
            </div>
        </div>
    );
}

