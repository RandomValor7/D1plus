//Esto agrega productos y cantidades a una venta o un pedido y calcula el total. Si un producto no se repite se acumula la cantidad.
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Table from "../ui/Table";
import { formatoPesos } from "../../utils/formato";

// Líneas de una venta o un pedido (cabecera + detalle)
// lineas: [{ id, nombre, precio, cantidad }]

export default function DetalleLineas({ productos, lineas, onChange }) {
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState("");
    function agregar() {
        const producto = productos.find((p) => p.id === Number(idProducto));
        const unidades = Number(cantidad);
        if (!producto || unidades <= 0) return;
        const existente = lineas.find((l) => l.id === producto.id);
        if (existente) {
            // Un producto no se repite en la misma venta o pedido
            onChange(
                lineas.map((l) =>
                    l.id === producto.id
                        ? { ...l, cantidad: l.cantidad + unidades }
                        : l
                )
            );
        } else {
            onChange([
                ...lineas,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: unidades,
                },
            ]);
        }
        setIdProducto("");
        setCantidad("");
    }
    function quitar(id) {
        onChange(lineas.filter((l) => l.id !== id));
    }
    const total = lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0);
    const columnas = [
        { clave: "nombre", titulo: "Producto" },
        { clave: "cantidad", titulo: "Cantidad" },
        {
            clave: "precio",
            titulo: "Precio",
            render: (l) => formatoPesos(l.precio),
        },
        {
            clave: "subtotal",
            titulo: "Subtotal",
            render: (l) => formatoPesos(l.precio * l.cantidad),
        },
        {
            clave: "accion",
            titulo: "",
            render: (l) => (
                <Button variante="peligro" onClick={() => quitar(l.id)}>
                    Quitar
                </Button>
            ),
        },
    ];
    return (
        <div>
            <div className="fila-formulario">
                <Select
                    etiqueta="Producto"
                    opciones={productos.map((p) => ({
                        valor: p.id,
                        texto: p.nombre,
                    }))}
                    value={idProducto}
                    onChange={(e) => setIdProducto(e.target.value)}
                />
                <Input
                    etiqueta="Cantidad"
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
                <Button variante="secundario" onClick={agregar}>
                    Agregar
                </Button>
            </div>
            <Table
                columnas={columnas}
                filas={lineas}
                vacio="Aún no hay productos agregados."
            />
            <p className="total">Total: {formatoPesos(total)}</p>
        </div>
    );
}

