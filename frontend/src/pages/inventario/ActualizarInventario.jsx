//  Aqui se realiza el cambio manual de cantidad con observación obligatoria (RF10).

import { useState } from "react";
import { inventario } from "../../data/datosPrueba";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import JustificacionForm from "../../components/common/JustificacionForm";

const VACIO = { item: "", cantidad: "" };

export default function ActualizarInventario() {
    const [form, setForm] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const cambiar = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    function confirmar(observacion) {
        const nuevos = validarObligatorios(form, Object.keys(VACIO));
        if (!nuevos.cantidad && Number(form.cantidad) < 0) {
            nuevos.cantidad = "No puede ser negativa";
        }
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;
        setMensaje(
            "Inventario actualizado a " + form.cantidad +
            " unidades. Observación: " + observacion
        );
        setForm(VACIO);
    }
    return (
        <Card titulo="Actualizar inventario manualmente">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <Select
                etiqueta="Producto y ubicación"
                name="item"
                opciones={inventario.map((i) => ({
                    valor: i.id,
                    texto: i.producto + " - " + i.ubicacion,
                }))}
                value={form.item}
                error={errores.item}
                onChange={cambiar}
            />
            <Input
                etiqueta="Nueva cantidad"
                type="number"
                name="cantidad"
                value={form.cantidad}
                error={errores.cantidad}
                onChange={cambiar}
            />
            <JustificacionForm
                etiqueta="Observación (obligatoria)"
                textoBoton="Actualizar inventario"
                onConfirmar={confirmar}
            />
        </Card>
    );
}

