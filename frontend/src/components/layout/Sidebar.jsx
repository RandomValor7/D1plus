// Esto es el menu lateral que muestra los módulos que el rol puede usar y, al entrar a uno, sus pantallas (RF32).

import { Link, useLocation } from "react-router-dom";
import { MENU } from "../../config/permisos";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
    const { usuario } = useAuth();
    const { pathname } = useLocation();
    const items = MENU.filter((m) => m.roles.includes(usuario.rol));
    return (
        <aside className="sidebar">
            <div className="logo">D1pluS</div>
            <nav>
                {items.map((m) => {
                    const activo = pathname.startsWith(m.base);
                    return (
                        <div key={m.base}>
                            <Link
                                to={m.ruta}
                                className={"sidebar-link" + (activo ? " activo" : "")}
                            >
                                {m.etiqueta}
                            </Link>
                            {activo &&
                                m.sub &&
                                m.sub.map((s) => (
                                    <Link
                                        key={s.ruta}
                                        to={s.ruta}
                                        className={
                                            "sidebar-sub" + (pathname === s.ruta ? " activo" : "")
                                        }
                                    >
                                        {s.etiqueta}
                                    </Link>
                                ))}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}

