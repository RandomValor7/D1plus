import Alert from "./Alert";
// Muestra "Cargando...", el error de la API, o el contenido , las dos opciones en una

export default function Carga({ cargando, error, children }) {
    if (cargando) {
        return <p className="vacio">Cargando...</p>;
    }
    if (error) {
        return <Alert tipo="error">{error}</Alert>;
    }
    return children;
}
