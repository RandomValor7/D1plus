// Pagina para registrar devolución de producto a un proveedor con su motivo.

import { useState } from "react";
import { productos, proveedores } from "../../data/datosPrueba";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

const VACIO = { proveedor: "", producto: "", cantidad: "", motivo: "" };

export default function RegistrarDevolucion() {
    const [form, setForm] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const cambiar = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    function guardar(e) {
        e.preventDefault();
        const nuevos = validarObligatorios(form, Object.keys(VACIO));
        if (!nuevos.cantidad && Number(form.cantidad) <= 0) {
            nuevos.cantidad = "Debe ser mayor a 0";
        }
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;
        setForm(VACIO);
        setMensaje("Devolución registrada correctamente.");
    }
    return (
        <Card titulo="Registrar devolución a proveedor">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <form onSubmit={guardar}>
                <Select
                    etiqueta="Proveedor"
                    name="proveedor"
                    opciones={proveedores.map((p) => p.nombre)}
                    value={form.proveedor}
                    error={errores.proveedor}
                    onChange={cambiar}
                />
                <Select
                    etiqueta="Producto"
                    name="producto"
                    opciones={productos.map((p) => p.nombre)}
                    value={form.producto}
                    error={errores.producto}
                    onChange={cambiar}
                />
                <Input
                    etiqueta="Cantidad"
                    type="number"
                    name="cantidad"
                    value={form.cantidad}
                    error={errores.cantidad}
                    onChange={cambiar}
                />
                <Input
                    etiqueta="Motivo de la devolución"
                    name="motivo"
                    value={form.motivo}
                    error={errores.motivo}
                    onChange={cambiar}
                />
                <div className="acciones">
                    <Button type="submit">Registrar devolución</Button>
                </div>
            </form>
        </Card>
    );
}

