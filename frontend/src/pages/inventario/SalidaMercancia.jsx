// Avisa la cantidad de mercancía que se va a sacar de una bodega , si es insuficiente (RF09).

import { useState } from "react";
import {
    bodegas,
    inventario,
    productos,
    ubicaciones,
} from "../../data/datosPrueba";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

const VACIO = { producto: "", origen: "", destino: "", cantidad: "" };

const OPCIONES_PRODUCTO = productos.map((p) => ({
    valor: p.id,
    texto: p.nombre,
}));

export default function SalidaMercancia() {
    const [form, setForm] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const cambiar = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    function guardar(e) {
        e.preventDefault();
        const nuevos = validarObligatorios(form, Object.keys(VACIO));
        if (!nuevos.destino && form.destino === form.origen) {
            nuevos.destino = "El destino debe ser distinto del origen";
        }
        if (!nuevos.cantidad) {
            const fila = inventario.find(
                (i) =>
                    i.idProducto === Number(form.producto) &&
                    i.ubicacion === form.origen
            );
            const disponible = fila ? fila.cantidad : 0;
            if (Number(form.cantidad) <= 0) {
                nuevos.cantidad = "Debe ser mayor a 0";
            } else if (Number(form.cantidad) > disponible) {
                nuevos.cantidad = "Cantidad insuficiente en inventario";
            }
        }
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;
        setMensaje(
            "Salida registrada: " + form.cantidad + " unidades hacia " +
            form.destino + "."
        );
        setForm(VACIO);
    }
    return (
        <Card titulo="Registrar salida de mercancía">
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
                    etiqueta="Bodega de origen"
                    name="origen"
                    opciones={bodegas}
                    value={form.origen}
                    error={errores.origen}
                    onChange={cambiar}
                />
                <Select
                    etiqueta="Destino (tienda u otra bodega)"
                    name="destino"
                    opciones={ubicaciones}
                    value={form.destino}
                    error={errores.destino}
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
                    <Button type="submit">Registrar salida</Button>
                </div>
            </form>
        </Card>
    );
}

