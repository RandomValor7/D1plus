//El administrador registra usuarios (RF01). Valida que el correo no se repita.

import { useState } from "react";
import { ROLES } from "../../config/permisos";
import { usuarios } from "../../data/datosPrueba";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import StatusBadge from "../../components/ui/StatusBadge";
import Table from "../../components/ui/Table";

const VACIO = {
    nombre: "",
    correo: "",
    cargo: "",
    rol: "",
    contrasena: "",
};

export default function RegistrarUsuario() {
    const [lista, setLista] = useState(usuarios);
    const [form, setForm] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const cambiar = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    function guardar(e) {
        e.preventDefault();
        const nuevos = validarObligatorios(form, Object.keys(VACIO));
        if (!nuevos.correo && lista.some((u) => u.correo === form.correo)) {
            nuevos.correo = "Ya existe un usuario con ese correo";
        }
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;
        setLista([
            ...lista,
            { id: lista.length + 1, ...form, estado: "Activo" },
        ]);
        setForm(VACIO);
        setMensaje("Usuario registrado correctamente.");
    }
    const columnas = [
        { clave: "nombre", titulo: "Nombre" },
        { clave: "correo", titulo: "Correo" },
        { clave: "cargo", titulo: "Cargo" },
        { clave: "rol", titulo: "Rol" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (u) => <StatusBadge estado={u.estado} />,
        },
    ];
    return (
        <>
            <Card titulo="Registrar usuario">
                {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
                <form onSubmit={guardar}>
                    <Input
                        etiqueta="Nombre completo"
                        name="nombre"
                        value={form.nombre}
                        error={errores.nombre}
                        onChange={cambiar}
                    />
                    <Input
                        etiqueta="Correo electrónico"
                        type="email"
                        name="correo"
                        value={form.correo}
                        error={errores.correo}
                        onChange={cambiar}
                    />
                    <Input
                        etiqueta="Cargo"
                        name="cargo"
                        value={form.cargo}
                        error={errores.cargo}
                        onChange={cambiar}
                    />
                    <Select
                        etiqueta="Rol"
                        name="rol"
                        opciones={Object.values(ROLES)}
                        value={form.rol}
                        error={errores.rol}
                        onChange={cambiar}
                    />
                    <Input
                        etiqueta="Contraseña"
                        type="password"
                        name="contrasena"
                        value={form.contrasena}
                        error={errores.contrasena}
                        onChange={cambiar}
                    />
                    <div className="acciones">
                        <Button type="submit">Guardar</Button>
                        <Button variante="secundario" onClick={() => setForm(VACIO)}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Card>
            <Card titulo="Usuarios registrados">
                <Table columnas={columnas} filas={lista} />
            </Card>
        </>
    );
}

