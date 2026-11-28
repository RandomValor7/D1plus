import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, configurarExpiracion } from "../services/api";

const AuthContext = createContext(null);

function leerSesion() {
    try {
        const guardado = sessionStorage.getItem("d1plus_usuario");
        return guardado ? JSON.parse(guardado) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesion);
    const [aviso, setAviso] = useState("");
    const cerrar = useCallback(() => {
        sessionStorage.removeItem("d1plus_usuario");
        sessionStorage.removeItem("d1plus_token");
        setUsuario(null);
    }, []);
    // Si la API responde 401 con una sesion abierta, el token vencio
    useEffect(() => {
        configurarExpiracion(() => {
            cerrar();
            setAviso("Tu sesion expiro, inicia sesion de nuevo");
        });
    }, [cerrar]);
    // Inicia sesion en la API. Si falla, lanza el error con su mensaje respectivo
    async function login(correo, contrasena) {
        const respuesta = await api.post("/auth/login", { correo, contrasena });
        sessionStorage.setItem("d1plus_token", respuesta.token);
        sessionStorage.setItem("d1plus_usuario", JSON.stringify(respuesta.usuario));
        setAviso("");
        setUsuario(respuesta.usuario);
    }
    function logout() {
        setAviso("");
        cerrar();
    }
    return (
        <AuthContext.Provider value={{ usuario, aviso, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

