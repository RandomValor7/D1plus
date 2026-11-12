import { ROLES } from "../config/permisos";

// Datos de prueba sin necesidad de backend.

export const usuarios = [
    {
        id: 1,
        nombre: "Laura Gómez",
        correo: "admin@d1plus.com",
        contrasena: "Admin123",
        cargo: "Administradora del sistema",
        rol: ROLES.ADMIN,
        estado: "Activo",
    },
    {
        id: 2,
        nombre: "Carlos Ruiz",
        correo: "gerente@d1plus.com",
        contrasena: "Gerente123",
        cargo: "Gerente de operaciones",
        rol: ROLES.GERENTE,
        estado: "Activo",
    },
    {
        id: 3,
        nombre: "Marta Díaz",
        correo: "tienda@d1plus.com",
        contrasena: "Tienda123",
        cargo: "Cajera",
        rol: ROLES.TIENDA,
        estado: "Activo",
    },
    {
        id: 4,
        nombre: "Juan Pérez",
        correo: "bodega@d1plus.com",
        contrasena: "Bodega123",
        cargo: "Auxiliar de bodega",
        rol: ROLES.BODEGA,
        estado: "Activo",
    },
];
export const bodegas = ["Bodega Central", "Bodega Sur"];
export const tiendas = ["Tienda Centro", "Tienda Norte"];
export const ubicaciones = [...bodegas, ...tiendas];

export const productos = [
    {
        id: 1,
        codigo: "P-001",
        nombre: "Arroz 500 g",
        precio: 2800,
        stock: 120,
        stockMinimo: 30,
    },
    {
        id: 2,
        codigo: "P-002",
        nombre: "Leche entera 1 L",
        precio: 4200,
        stock: 25,
        stockMinimo: 40,
    },
    {
        id: 3,
        codigo: "P-003",
        nombre: "Aceite vegetal 1 L",
        precio: 12500,
        stock: 60,
        stockMinimo: 20,
    },
    {
        id: 4,
        codigo: "P-004",
        nombre: "Huevos x30",
        precio: 18000,
        stock: 0,
        stockMinimo: 10,
    },
    {
        id: 5,
        codigo: "P-005",
        nombre: "Jabón de baño",
        precio: 3200,
        stock: 8,
        stockMinimo: 15,
    },
    {
        id: 6,
        codigo: "P-006",
        nombre: "Panela 500 g",
        precio: 3500,
        stock: 45,
        stockMinimo: 15,
    },
];

export const inventario = [
    {
        id: 1,
        idProducto: 1,
        codigo: "P-001",
        producto: "Arroz 500 g",
        ubicacion: "Bodega Central",
        cantidad: 90,
        minimo: 30,
    },
    {
        id: 2,
        idProducto: 1,
        codigo: "P-001",
        producto: "Arroz 500 g",
        ubicacion: "Tienda Centro",
        cantidad: 30,
        minimo: 30,
    },
    {
        id: 3,
        idProducto: 2,
        codigo: "P-002",
        producto: "Leche entera 1 L",
        ubicacion: "Bodega Central",
        cantidad: 25,
        minimo: 40,
    },
    {
        id: 4,
        idProducto: 3,
        codigo: "P-003",
        producto: "Aceite vegetal 1 L",
        ubicacion: "Bodega Sur",
        cantidad: 60,
        minimo: 20,
    },
    {
        id: 5,
        idProducto: 4,
        codigo: "P-004",
        producto: "Huevos x30",
        ubicacion: "Tienda Norte",
        cantidad: 0,
        minimo: 10,
    },
    {
        id: 6,
        idProducto: 5,
        codigo: "P-005",
        producto: "Jabón de baño",
        ubicacion: "Tienda Centro",
        cantidad: 8,
        minimo: 15,
    },
    {
        id: 7,
        idProducto: 6,
        codigo: "P-006",
        producto: "Panela 500 g",
        ubicacion: "Bodega Sur",
        cantidad: 45,
        minimo: 15,
    },
];

export const proveedores = [
    {
        id: 1,
        nit: "900123456-1",
        nombre: "Distribuidora Andina",
        telefono: "3001234567",
        correo: "ventas@andina.com",
        direccion: "Calle 10 # 5-20",
    },
    {
        id: 2,
        nit: "800987654-3",
        nombre: "Lácteos del Valle",
        telefono: "3109876543",
        correo: "pedidos@lacteos.com",
        direccion: "Carrera 8 # 12-40",
    },
    {
        id: 3,
        nit: "901555222-7",
        nombre: "Aseo y Hogar S.A.S.",
        telefono: "3205551234",
        correo: "info@aseohogar.com",
        direccion: "Avenida 3 # 7-15",
    },
];

export const ventas = [
    {
        id: 1,
        fecha: "2026-11-10 09:15",
        total: 14000,
        estado: "Completada",
        vendedor: "Marta Díaz",
    },
    {
        id: 2,
        fecha: "2026-11-10 11:40",
        total: 36000,
        estado: "Completada",
        vendedor: "Marta Díaz",
    },
    {
        id: 3,
        fecha: "2026-11-10 15:05",
        total: 8400,
        estado: "Anulada",
        vendedor: "Marta Díaz",
    },
    {
        id: 4,
        fecha: "2026-11-11 08:30",
        total: 25000,
        estado: "Completada",
        vendedor: "Marta Díaz",
    },
];

export const pedidos = [
    {
        id: 1,
        fecha: "2026-11-08",
        proveedor: "Distribuidora Andina",
        tipo: "Normal",
        estado: "Pendiente",
    },
    {
        id: 2,
        fecha: "2026-11-09",
        proveedor: "Lácteos del Valle",
        tipo: "Urgente",
        estado: "Pendiente",
    },
    {
        id: 3,
        fecha: "2026-11-09",
        proveedor: "Aseo y Hogar S.A.S.",
        tipo: "Normal",
        estado: "Aprobado",
    },
    {
        id: 4,
        fecha: "2026-11-05",
        proveedor: "Distribuidora Andina",
        tipo: "Normal",
        estado: "Despachado",
    },
];

export const notificaciones = [
    {
        id: 1,
        tipo: "Stock bajo",
        mensaje: "Leche entera 1 L tiene 25 unidades (mínimo: 40)",
        fecha: "2026-11-11 07:00",
        leida: false,
    },
    {
        id: 2,
        tipo: "Stock bajo",
        mensaje: "Jabón de baño tiene 8 unidades (mínimo: 15)",
        fecha: "2026-11-11 07:00",
        leida: false,
    },
    {
        id: 3,
        tipo: "Pedido pendiente",
        mensaje: "El pedido #2 lleva 2 días sin aprobarse",
        fecha: "2026-11-11 08:00",
        leida: false,
    },
    {
        id: 4,
        tipo: "Sistema",
        mensaje: "Copia de seguridad realizada correctamente",
        fecha: "2026-11-10 23:00",
        leida: true,
    },
];

export const auditoria = [
    {
        id: 1,
        fecha: "2026-11-11 08:30",
        usuario: "Marta Díaz",
        accion: "Registrar venta",
        descripcion: "Venta #4 por $25.000",
    },
    {
        id: 2,
        fecha: "2026-11-10 16:20",
        usuario: "Carlos Ruiz",
        accion: "Anular venta",
        descripcion: "Venta #3 anulada: error de digitación",
    },
    {
        id: 3,
        fecha: "2026-11-10 10:05",
        usuario: "Juan Pérez",
        accion: "Entrada de inventario",
        descripcion: "50 unidades de Arroz 500 g en Bodega Central",
    },
    {
        id: 4,
        fecha: "2026-11-09 14:00",
        usuario: "Laura Gómez",
        accion: "Registrar usuario",
        descripcion: "Usuario bodega@d1plus.com creado",
    },
];

export const historialOperaciones = [
    {
        id: 1,
        tipo: "Venta",
        referencia: "Venta #4",
        fecha: "2026-11-11",
        usuario: "Marta Díaz",
        estado: "Completada",
    },
    {
        id: 2,
        tipo: "Venta",
        referencia: "Venta #3",
        fecha: "2026-11-10",
        usuario: "Marta Díaz",
        estado: "Anulada",
    },
    {
        id: 3,
        tipo: "Pedido",
        referencia: "Pedido #3",
        fecha: "2026-11-09",
        usuario: "Carlos Ruiz",
        estado: "Aprobado",
    },
    {
        id: 4,
        tipo: "Devolución",
        referencia: "Devolución #1",
        fecha: "2026-11-07",
        usuario: "Juan Pérez",
        estado: "Completada",
    },
];

export const rotacion = [
    { id: 1, producto: "Arroz 500 g", vendidas: 240, nivel: "Alta" },
    { id: 2, producto: "Leche entera 1 L", vendidas: 130, nivel: "Alta" },
    { id: 3, producto: "Aceite vegetal 1 L", vendidas: 55, nivel: "Media" },
    { id: 4, producto: "Jabón de baño", vendidas: 12, nivel: "Baja" },
];
