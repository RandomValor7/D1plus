// Sirve para pedir el enlace de recuperación de forma simulada.

import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function RecuperarContrasena() {
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    async function enviar(e) {
        e.preventDefault();
        setMensaje("");
        if (correo.trim() === "") {
            setError("Campo obligatorio");
            return;
        }
        setError("");
        try {
            const respuesta = await api.post("/auth/recuperar", { correo });
            setMensaje(respuesta.mensaje);
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <>
            <p className="auth-subtitulo">
                Ingresa tu correo y te enviaremos un enlace para restablecer tu
                contraseña
            </p>
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <form onSubmit={enviar}>
                <Input
                    etiqueta="Correo electrónico"
                    type="email"
                    placeholder="Escribe aquí..."
                    value={correo}
                    error={error}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <Button type="submit">Enviar enlace</Button>
            </form>
            <p>
                <Link to="/login">Volver a iniciar sesión</Link>
            </p>
        </>
    );
}

