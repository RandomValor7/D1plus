# D1pluS – Frontend (React + Vite)

Interfaz web del sistema D1pluS/D1+ (gestión interna de inventario,
ventas, pedidos, proveedores, reportes, alertas y auditoría).
Evidencia GA7-220501096-AA4-EV02. Los componentes de este proyecto son
los que se describieron en el documento de componentes front-end.

> Esta versión **no se conecta a ningún backend**: todas las pantallas
> funcionan con datos de prueba guardados en `src/data/datosPrueba.js`.

## Tecnologías
- React + Vite (JavaScript)
- React Router (navegación entre pantallas)
- CSS propio (`src/index.css`), basado en el sistema de diseño del
 prototipo de Figma
## Cómo ejecutarlo
```bash
cd frontend
npm install
npm run dev
```
Abrir en el navegador la dirección que muestre la terminal
(normalmente http://localhost:5173).
## Usuarios de prueba
 Rol // Correo  //  Contraseña 
Administrador , admin@d1plus.com , Admin123.
Gerente , gerente@d1plus.com , Gerente123.
Empleado de tienda , tienda@d1plus.com , Tienda123. 
Empleado de bodega , bodega@d1plus.com , Bodega123. 
El menú lateral y las pantallas permitidas cambian según el rol.
## Componentes descritos y codificados
Estructura: (`src/App.jsx` y `src/components/layout/`)
- App, AuthLayout, MainLayout, Sidebar, Topbar
Interfaz reutilizable:(`src/components/ui/`)
- Button, Input, Select, Card, Table, SearchFilter, Modal,
 StatusBadge, Alert
Seguridad:
- AuthProvider (`src/context/AuthContext.jsx`)
- ProtectedRoute (`src/components/common/ProtectedRoute.jsx`)
- useIdleTimer (`src/hooks/useIdleTimer.js`)
Específicos de D1pluS: (`src/components/common/`)
- KpiCard, StockIndicator, NotificationBell, DetalleLineas,
 ExportButton, JustificacionForm
Pantallas por módulo:  (`src/pages/`)
- Autenticación y usuarios: Login, RecuperarContrasena,
 RegistrarUsuario, AsignarRoles
- Inventario: InventarioGeneral, EntradaMercancia, SalidaMercancia,
ActualizarInventario
- Ventas: RegistrarVenta, HistorialVentas, AnularVentaModal
- Pedidos: CrearPedido, ListaPedidos, AprobarPedido, DespacharPedido
- Proveedores: ListaProveedores, RegistrarProveedor,
 RegistrarDevolucion
- Reportes: ReporteVentas, ReporteInventario, ReporteAgotados,
 ReporteRotacion
- Dashboard: DashboardPrincipal
- Notificaciones: ListaNotificaciones
- Auditoría: RegistroAuditoria, HistorialOperaciones

