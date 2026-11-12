// Sirve para pedir el enlace de recuperación de forma simulada.

import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function RecuperarContrasena() {
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState("");
    const [enviado, setEnviado] = useState(false);
    function enviar(e) {
        e.preventDefault();
        if (correo.trim() === "") {
            setError("Campo obligatorio");
            return;
        }
        setError("");
        setEnviado(true);
    }
    return (
        <>
            <p className="auth-subtitulo">
                Ingresa tu correo y te enviaremos un enlace para restablecer tu
                contraseña
            </p>
            {enviado && (
                <Alert tipo="exito">
                    Si el correo existe, recibirás el enlace (simulado, sin backend).
                </Alert>
            )}
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

