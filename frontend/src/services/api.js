// Todas las peticiones al backend pasan por este archivo
const BASE = import.meta.env.VITE_API_URL ?? "/api";
export class ErrorApi extends Error {
    constructor(estado, mensaje) {
        super(mensaje);
        this.estado = estado;
    }
}

// AuthProvider registra aqui que hacer cuando el token vence
let alExpirar = () => { };
export const configurarExpiracion = (funcion) => {
    alExpirar = funcion;
};
const leerToken = () => sessionStorage.getItem("d1plus_token");
const pedir = async (metodo, ruta, cuerpo) => {
    const token = leerToken();
    const encabezados = {};
    if (cuerpo !== undefined) {
        encabezados["Content-Type"] = "application/json";
    }
    if (token) {
        encabezados.Authorization = "Bearer " + token;
    }
    const respuesta = await fetch(BASE + ruta, {
        method: metodo,
        headers: encabezados,
        body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo)
    });
    const tipo = respuesta.headers.get("content-type") ?? "";
    const datos = tipo.includes("json") ? await respuesta.json() : null;
    if (!respuesta.ok) {
        // Con token y 401: la sesion vencio (RF05)
        if (respuesta.status === 401 && token) {
            alExpirar();
        }
        throw new ErrorApi(
            respuesta.status,
            datos?.mensaje ?? "Error " + respuesta.status
        );
    }
    return datos;
};

export const api = {
    get: (ruta) => pedir("GET", ruta),
    post: (ruta, cuerpo = {}) => pedir("POST", ruta, cuerpo),
    put: (ruta, cuerpo = {}) => pedir("PUT", ruta, cuerpo),
    patch: (ruta, cuerpo = {}) => pedir("PATCH", ruta, cuerpo)
};

// Descarga un archivo (reportes en PDF o Excel) enviando el token
export const descargar = async (ruta, nombre) => {
    const respuesta = await fetch(BASE + ruta, {
        headers: { Authorization: "Bearer " + leerToken() }
    });
    if (!respuesta.ok) {
        throw new ErrorApi(respuesta.status, "No se pudo descargar");
    }
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(await respuesta.blob());
    enlace.download = nombre;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
};

