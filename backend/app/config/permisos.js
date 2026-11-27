const ROLES = {
 ADMIN: "Administrador",
 GERENTE: "Gerente",
 TIENDA: "Empleado de tienda",
 BODEGA: "Empleado de bodega"
};

const { ADMIN, GERENTE, TIENDA, BODEGA } = ROLES;
const TODOS = Object.values(ROLES);

// Rutas genericas del CRUD (GET = leer; POST, PUT, PATCH, DELETE =
// escribir). 
// Las operaciones de negocio (vender, pedir, mover
// inventario) tienen sus propias rutas y roles, mas abajo.

const ACCESO = {
 usuarios: { leer: [ADMIN], escribir: [ADMIN] },
 roles: { leer: TODOS, escribir: [ADMIN] },
 bodegas: { leer: TODOS, escribir: [ADMIN, GERENTE] },
 tiendas: { leer: TODOS, escribir: [ADMIN, GERENTE] },
 productos: { leer: TODOS, escribir: [ADMIN, GERENTE, BODEGA] },
 proveedores: { leer: TODOS, escribir: [ADMIN, GERENTE] },
 productoProveedor: { leer: TODOS, escribir: [ADMIN, GERENTE] },
 inventarios: { leer: TODOS, escribir: [ADMIN] },
 movimientos: {
 leer: [ADMIN, GERENTE, BODEGA],
 escribir: [ADMIN]
 },
 ventas: {
 leer: [ADMIN, GERENTE, TIENDA],
 escribir: [ADMIN, GERENTE]
 },
 detalleVentas: {
 leer: [ADMIN, GERENTE, TIENDA],
 escribir: [ADMIN]
 },
 pedidos: { leer: TODOS, escribir: [ADMIN] },
 detallePedidos: { leer: TODOS, escribir: [ADMIN] },
 notificaciones: { leer: TODOS, escribir: TODOS },
 auditorias: { leer: [ADMIN, GERENTE], escribir: [ADMIN] }
};

// Quien puede hacer cada operacion de negocio
const OPERACIONES = {
 vender: [ADMIN, GERENTE, TIENDA],
 pedir: [ADMIN, GERENTE, TIENDA],
 despachar: [ADMIN, GERENTE, BODEGA],
 inventario: [ADMIN, GERENTE, BODEGA],
 devoluciones: [ADMIN, GERENTE, BODEGA],
 reportes: [ADMIN, GERENTE],
 alertas: [ADMIN, GERENTE]
};

// Quienes reciben las alertas automaticas (RF33 a RF36)
const RECEPTORES_ALERTAS = [ADMIN, GERENTE, BODEGA];
module.exports = {
 ROLES,
 ACCESO,
 OPERACIONES,
 RECEPTORES_ALERTAS,
 TODOS
};
