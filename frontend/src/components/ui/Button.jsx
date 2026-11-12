import { Link } from "react-router-dom";

// Boon con 3 variantes: primario, secundario y peligroso. Se puede usar como boton o como link.

export default function Button({
    variante = "primario",
    to,
    children,
    ...resto
}) {
    const clase = "btn btn-" + variante;
    if (to) {
        return (
            <Link to={to} className={clase}>
                {children}
            </Link>
        );
    }
    return (
        <button type="button" className={clase} {...resto}>
            {children}
        </button>
    );
}