// Alertas con el botón Marcar como leída.

import { useState } from "react";
import { ACCESO } from "../../config/permisos";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Carga from "../../components/ui/Carga";
import Table from "../../components/ui/Table";

// Quienes pueden pedir que se revisen las alertas (RF33 a RF36)

const ROLES_ALERTAS = ACCESO.reportes;

export default function ListaNotificaciones() {
    const { usuario } = useAuth();
    const { datos, cargando, error, recargar } = useApi(() =>
        api.get("/notificaciones/mias")
    );
    const [mensaje, setMensaje] = useState("");
    const [errorApi, setErrorApi] = useState("");
    async function marcarLeida(id) {
        setErrorApi("");
        try {
            await api.put("/notificaciones/" + id, { estado: 1 });
            recargar();
        } catch (err) {
            setErrorApi(err.message);
        }
    }
    async function revisarAlertas() {
        setMensaje("");
        setErrorApi("");
        try {
            const r = await api.post("/notificaciones/generar");
            const nuevas = Object.values(r.creadas).reduce((s, n) => s + n, 0);
            setMensaje("Alertas revisadas. Alertas nuevas: " + nuevas);
            recargar();
        } catch (err) {
            setErrorApi(err.message);
        }
    }
    const columnas = [
        { clave: "tipo", titulo: "Tipo" },
        { clave: "mensaje", titulo: "Mensaje" },
        { clave: "fecha", titulo: "Fecha" },
        {
            clave: "estado",
            titulo: "Estado",
            render: (n) => (n.estado === 1 ? "Leída" : "Sin leer"),
        },
        {
            clave: "accion",
            titulo: "",
            render: (n) =>
                n.estado === 0 && (
                    <Button
                        variante="secundario"
                        onClick={() => marcarLeida(n.id_notificacion)}
                    >
                        Marcar como leída
                    </Button>
                ),
        },
    ];
    return (
        <Card titulo="Notificaciones">
            {mensaje && <Alert tipo="exito">{mensaje}</Alert>}
            {errorApi && <Alert tipo="error">{errorApi}</Alert>}
            {ROLES_ALERTAS.includes(usuario.rol) && (
                <div className="acciones">
                    <Button variante="secundario" onClick={revisarAlertas}>
                        Revisar alertas ahora
                    </Button>
                </div>
            )}
            <Carga cargando={cargando} error={error}>
                <Table
                    columnas={columnas}
                    filas={datos ?? []}
                    vacio="No tienes notificaciones."
                />
            </Carga>
        </Card>
    );
}

