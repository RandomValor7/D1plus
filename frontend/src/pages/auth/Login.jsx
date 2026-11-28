// Inicio de sesión con los usuarios de prueba.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function Login() {
    const { login, aviso } = useAuth();
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    async function enviar(e) {
        e.preventDefault();
        if (correo === "" || contrasena === "") {
            setError("Complete todos los campos.");
            return;
        }
        setEnviando(true);
        try {
            await login(correo, contrasena);
            navigate("/dashboard");
        } catch (err) {
            // Mensaje de la API: credenciales incorrectas, usuario inactivo...
            setError(err.message);
            setEnviando(false);
        }
    }
    return (
        <>
            <p className="auth-subtitulo">Inicia sesión en tu cuenta</p>
            {aviso && <Alert tipo="advertencia">{aviso}</Alert>}
            {error && <Alert tipo="error">{error}</Alert>}
            <form onSubmit={enviar}>
                <Input
                    etiqueta="Correo electrónico"
                    type="email"
                    placeholder="Escribe aquí..."
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <Input
                    etiqueta="Contraseña"
                    type="password"
                    placeholder="Escribe aquí..."
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <Button type="submit" disabled={enviando}>
                    {enviando ? "Entrando..." : "Iniciar sesión"}
                </Button>
            </form>
            <p>
                <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
            </p>
        </>
    );
}
