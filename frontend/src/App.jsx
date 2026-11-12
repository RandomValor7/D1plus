// Lista de rutas en una tabla como direcccion, roles que pueden entrar y pantalla a mostrar. Se usa en App.jsx para crear las rutas de la aplicacion.

import { Navigate, Route, Routes } from "react-router-dom";
import { ACCESO } from "./config/permisos";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/auth/Login";
import RecuperarContrasena from "./pages/auth/RecuperarContrasena";
import DashboardPrincipal from "./pages/dashboard/DashboardPrincipal";
import RegistrarUsuario from "./pages/usuarios/RegistrarUsuario";
import AsignarRoles from "./pages/usuarios/AsignarRoles";
import InventarioGeneral from "./pages/inventario/InventarioGeneral";
import EntradaMercancia from "./pages/inventario/EntradaMercancia";
import SalidaMercancia from "./pages/inventario/SalidaMercancia";
import ActualizarInventario from "./pages/inventario/ActualizarInventario";
import RegistrarVenta from "./pages/ventas/RegistrarVenta";
import HistorialVentas from "./pages/ventas/HistorialVentas";
import CrearPedido from "./pages/pedidos/CrearPedido";
import ListaPedidos from "./pages/pedidos/ListaPedidos";
import AprobarPedido from "./pages/pedidos/AprobarPedido";
import DespacharPedido from "./pages/pedidos/DespacharPedido";
import ListaProveedores from "./pages/proveedores/ListaProveedores";
import RegistrarProveedor from "./pages/proveedores/RegistrarProveedor";
import RegistrarDevolucion from "./pages/proveedores/RegistrarDevolucion";
import ReporteVentas from "./pages/reportes/ReporteVentas";
import ReporteInventario from "./pages/reportes/ReporteInventario";
import ReporteAgotados from "./pages/reportes/ReporteAgotados";
import ReporteRotacion from "./pages/reportes/ReporteRotacion";
import ListaNotificaciones from
  "./pages/notificaciones/ListaNotificaciones";
import RegistroAuditoria from "./pages/auditoria/RegistroAuditoria";
import HistorialOperaciones from "./pages/auditoria/HistorialOperaciones";

// [ruta, roles que pueden entrar, pantalla]

const RUTAS = [
  ["/dashboard", ACCESO.todos, DashboardPrincipal],
  ["/usuarios/registrar", ACCESO.usuarios, RegistrarUsuario],
  ["/usuarios/roles", ACCESO.usuarios, AsignarRoles],
  ["/inventario", ACCESO.inventario, InventarioGeneral],
  ["/inventario/entrada", ACCESO.inventario, EntradaMercancia],
  ["/inventario/salida", ACCESO.inventario, SalidaMercancia],
  ["/inventario/actualizar", ACCESO.inventario, ActualizarInventario],
  ["/ventas", ACCESO.ventas, HistorialVentas],
  ["/ventas/registrar", ACCESO.ventas, RegistrarVenta],
  ["/pedidos", ACCESO.pedidos, ListaPedidos],
  ["/pedidos/crear", ACCESO.pedidos, CrearPedido],
  ["/pedidos/aprobar", ACCESO.pedidos, AprobarPedido],
  ["/pedidos/despachar", ACCESO.pedidos, DespacharPedido],
  ["/proveedores", ACCESO.proveedores, ListaProveedores],
  ["/proveedores/registrar", ACCESO.proveedores, RegistrarProveedor],
  ["/proveedores/devolucion", ACCESO.proveedores, RegistrarDevolucion],
  ["/reportes/ventas", ACCESO.reportes, ReporteVentas],
  ["/reportes/inventario", ACCESO.reportes, ReporteInventario],
  ["/reportes/agotados", ACCESO.reportes, ReporteAgotados],
  ["/reportes/rotacion", ACCESO.reportes, ReporteRotacion],
  ["/notificaciones", ACCESO.todos, ListaNotificaciones],
  ["/auditoria", ACCESO.auditoria, RegistroAuditoria],
  ["/auditoria/historial", ACCESO.auditoria, HistorialOperaciones],
];

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/recuperar-contrasena"
          element={<RecuperarContrasena />}
        />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {RUTAS.map(([ruta, roles, Pantalla]) => (
          <Route
            key={ruta}
            path={ruta}
            element={
              <ProtectedRoute roles={roles}>
                <Pantalla />
              </ProtectedRoute>
            }
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

