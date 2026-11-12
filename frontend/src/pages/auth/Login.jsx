// Inicio de sesión con los usuarios de prueba.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    function enviar(e) {
        e.preventDefault();
        if (correo === "" || contrasena === "") {
            setError("Complete todos los campos.");
            return;
        }
        if (login(correo, contrasena)) {
            navigate("/dashboard");
        } else {
            setError("Correo o contraseña incorrectos.");
        }
    }
    return (
        <>
            <p className="auth-subtitulo">Inicia sesión en tu cuenta</p>
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
                <Button type="submit">Iniciar sesión</Button>
            </form>
            <p>
                <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
            </p>
            <p className="ayuda-prueba">
                Usuarios de prueba: admin@d1plus.com / Admin123, gerente@d1plus.com
                / Gerente123, tienda@d1plus.com / Tienda123, bodega@d1plus.com /
                Bodega123
            </p>
        </>
    );
}

