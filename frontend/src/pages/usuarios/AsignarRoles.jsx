// El administrador se encarga de cambiar el rol de cada usuario (RF03).

import { useState } from "react";
import { ROLES } from "../../config/permisos";
import { usuarios } from "../../data/datosPrueba";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";

export default function AsignarRoles() {
    const [lista, setLista] = useState(usuarios);
    const [mensaje, setMensaje] = useState("");
    function cambiarRol(id, rol) {
        setLista(lista.map((u) => (u.id === id ? { ...u, rol } : u)));
    }
    const columnas = [
        { clave: "nombre", titulo: "Usuario" },
        { clave: "correo", titulo: "Correo" },
        {
            clave: "rol",
            titulo: "Rol",
            render: (u) => (
                <select
                    className="select-tabla"
                    value={u.rol}
                    onChange={(e) => cambiarRol(u.id, e.target.value)}
                >
                    {Object.values(ROLES).map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            ),
        },
    ];
    return (
        <Card titulo="Asignar roles">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            <Table columnas={columnas} filas={lista} />
            <div className="acciones">
                <Button onClick={() => setMensaje("Roles actualizados.")}>
                    Guardar cambios
                </Button>
            </div>
        </Card>
    );
}


