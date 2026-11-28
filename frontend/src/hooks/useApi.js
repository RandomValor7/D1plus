// dependencias: cuando cambian, se vuelve a cargar (filtros)
import { useEffect, useState } from "react";
// Carga datos de la API al abrir la pantalla.
// cargar: funcion que devuelve la peticion, ej: () => api.get("/ventas")
// Devuelve { datos, cargando, error, recargar }
export default function useApi(cargar, dependencias = []) {
    const [estado, setEstado] = useState({
        datos: null,
        error: "",
        cargando: true
    });
    const [version, setVersion] = useState(0);
    useEffect(() => {
        let activo = true;
        cargar()
            .then((datos) => {
                if (activo) setEstado({ datos, error: "", cargando: false });
            })
            .catch((e) => {
                if (activo) {
                    setEstado({ datos: null, error: e.message, cargando: false });
                }
            });
        return () => {
            activo = false;
        };

    }, [...dependencias, version]);
    const recargar = () => {
        setEstado((anterior) => ({ ...anterior, cargando: true }));
        setVersion((v) => v + 1);
    };
    return { ...estado, recargar };
}
