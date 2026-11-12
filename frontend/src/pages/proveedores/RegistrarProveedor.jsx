// Solo NIT y nombre son obligatorios, como en la base de datos aplica.

import { useState } from "react";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const VACIO = {
    nit: "",
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
};

export default function RegistrarProveedor() {
    const [form, setForm] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const cambiar = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    function guardar(e) {
        e.preventDefault();
        // Solo NIT y nombre son obligatorios
        const nuevos = validarObligatorios(form, ["nit", "nombre"]);
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;
        setForm(VACIO);
        setMensaje("Proveedor registrado correctamente.");
    }
    return (
        <Card titulo="Registrar proveedor">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <form onSubmit={guardar}>
                <Input
                    etiqueta="NIT"
                    name="nit"
                    value={form.nit}
                    error={errores.nit}
                    onChange={cambiar}
                />
                <Input
                    etiqueta="Nombre"
                    name="nombre"
                    value={form.nombre}
                    error={errores.nombre}
                    onChange={cambiar}
                />
                <Input
                    etiqueta="Teléfono"
                    name="telefono"
                    value={form.telefono}
                    onChange={cambiar}
                />
                <Input
                    etiqueta="Correo"
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={cambiar}
                />
                <Input
                    etiqueta="Dirección"
                    name="direccion"
                    value={form.direccion}
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
    );
}

