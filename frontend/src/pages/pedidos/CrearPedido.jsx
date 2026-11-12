// Esto es para crear un pedido a un proveedor con sus productos.

import { useState } from "react";
import { productos, proveedores } from "../../data/datosPrueba";
import { validarObligatorios } from "../../utils/validar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import DetalleLineas from "../../components/common/DetalleLineas";

const VACIO = { proveedor: "", tipo: "" };

export default function CrearPedido() {
    const [form, setForm] = useState(VACIO);
    const [lineas, setLineas] = useState([]);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const cambiar = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    function crear() {
        const nuevos = validarObligatorios(form, Object.keys(VACIO));
        if (lineas.length === 0) {
            nuevos.lineas = "Agrega al menos un producto al pedido.";
        }
        setErrores(nuevos);
        if (Object.keys(nuevos).length > 0) return;
        setForm(VACIO);
        setLineas([]);
        setMensaje("Pedido creado con estado Pendiente.");
    }
    return (
        <Card titulo="Crear pedido">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            {errores.lineas && <Alert tipo="error">{errores.lineas}</Alert>}
            <Select
                etiqueta="Proveedor"
                name="proveedor"
                opciones={proveedores.map((p) => p.nombre)}
                value={form.proveedor}
                error={errores.proveedor}
                onChange={cambiar}
            />
            <Select
                etiqueta="Tipo de pedido"
                name="tipo"
                opciones={["Normal", "Urgente"]}
                value={form.tipo}
                error={errores.tipo}
                onChange={cambiar}
            />
            <DetalleLineas
                productos={productos}
                lineas={lineas}
                onChange={setLineas}
            />
            <div className="acciones">
                <Button onClick={crear}>Crear pedido</Button>
            </div>
        </Card>
    );
}

