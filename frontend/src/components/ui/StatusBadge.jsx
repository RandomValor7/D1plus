// Etiqutas de estado con colores para indicar el estado de un elemento.(verde, amarillo, rojo, gris)

const COLORES = {
    Completada: "verde",
    Aprobado: "verde",
    Despachado: "verde",
    Activo: "verde",
    Alta: "verde",
    Pendiente: "amarillo",
    Media: "amarillo",
    Anulada: "rojo",
    Rechazado: "rojo",
    Inactivo: "rojo",
    Agotado: "rojo",
    Baja: "rojo",
};
export default function StatusBadge({ estado }) {
    const color = COLORES[estado] || "gris";
    return <span className={"badge badge-" + color}>{estado}</span>;
}

