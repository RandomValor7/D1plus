//Lee el token de la dirección (?token=...), pide la contraseña nueva dos veces y llama a
//POST /api/auth/restablecer

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

// Se abre desde el enlace del correo: /restablecer?token=...
export default function RestablecerContrasena() {
    const [parametros] = useSearchParams();
    const token = parametros.get("token") ?? "";
    const [contrasena, setContrasena] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");
    const [listo, setListo] = useState(false);

    async function enviar(e) {
        e.preventDefault();
        if (contrasena.length < 6) {
            setError("La contraseña debe tener mínimo 6 letras");
            return;
        }
        if (contrasena !== confirmar) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            await api.post("/auth/restablecer", { token, contrasena });
            setError("");
            setListo(true);
        } catch (err) {
            setError(err.message);
        }
    }
    if (listo) {
        return (
            <>
                <Alert tipo="exito">Contraseña actualizada.</Alert>
                <Link to="/login">Iniciar sesión</Link>
            </>
        );
    }
    return (
        <>
            <p className="auth-subtitulo">Escribe tu contraseña nueva</p>
            {!token && <Alert tipo="error">El enlace no tiene token.</Alert>}
            {error && <Alert tipo="error">{error}</Alert>}
            <form onSubmit={enviar}>
                <Input
                    etiqueta="Contraseña nueva"
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <Input
                    etiqueta="Confirmar contraseña"
                    type="password"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                />
                <Button type="submit">Guardar contraseña</Button>
            </form>
        </>
    );
}
