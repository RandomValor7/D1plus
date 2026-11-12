import { createContext, useContext, useState } from "react";
import { usuarios } from "../data/datosPrueba";

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
    function login(correo, contrasena) {
        const encontrado = usuarios.find(
            (u) => u.correo === correo && u.contrasena === contrasena
        );
        if (!encontrado) return false;
        const sesion = { ...encontrado };
        delete sesion.contrasena;
        sessionStorage.setItem("d1plus_usuario", JSON.stringify(sesion));
        setUsuario(sesion);
        return true;
    }
    function logout() {
        sessionStorage.removeItem("d1plus_usuario");
        setUsuario(null);
    }
    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

