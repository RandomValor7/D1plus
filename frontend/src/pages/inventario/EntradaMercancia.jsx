// Aqui se registra la entrada de mercancía a una bodega (RF08).

import { useState } from "react";
import { bodegas, productos } from "../../data/datosPrueba";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

const VACIO = { producto: "", bodega: "", cantidad: "" };

const OPCIONES_PRODUCTO = productos.map((p) => ({
    valor: p.id,
    texto: p.nombre,
}));

export default function EntradaMercancia() {
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
        const producto = productos.find((p) => p.id === Number(form.producto));
        setMensaje(
            "Entrada registrada: " + form.cantidad + " unidades de " +
            producto.nombre + " en " + form.bodega + "."
        );
        setForm(VACIO);
    }
    return (
        <Card titulo="Registrar entrada de mercancía">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <form onSubmit={guardar}>
                <Select
                    etiqueta="Producto"
                    name="producto"
                    opciones={OPCIONES_PRODUCTO}
                    value={form.producto}
                    error={errores.producto}
                    onChange={cambiar}
                />
                <Select
                    etiqueta="Bodega"
                    name="bodega"
                    opciones={bodegas}
                    value={form.bodega}
                    error={errores.bodega}
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
                <div className="acciones">
                    <Button type="submit">Registrar entrada</Button>
                </div>
            </form>
        </Card>
    );
}

