import { api } from "../services/api";
import useApi from "./useApi";
// Bodegas y tiendas juntas, para las listas desplegables.
// El valor es "b-1" (bodega 1) o "t-1" (tienda 1)

export default function useUbicaciones() {
    const { datos, cargando, error } = useApi(async () => {
        const [bodegas, tiendas] = await Promise.all([
            api.get("/bodegas"),
            api.get("/tiendas")
        ]);
        return { bodegas, tiendas };
    });
    const bodegas = (datos?.bodegas ?? []).map((b) => ({
        valor: "b-" + b.id_bodega,
        texto: b.nombre + " (bodega)"
    }));
    const tiendas = (datos?.tiendas ?? []).map((t) => ({
        valor: "t-" + t.id_tienda,
        texto: t.nombre + " (tienda)"
    }));
    return { bodegas, tiendas, todas: [...bodegas, ...tiendas], cargando, error };
}

