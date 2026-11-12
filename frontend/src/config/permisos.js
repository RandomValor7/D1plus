export const ROLES = {
    ADMIN: "Administrador",
    GERENTE: "Gerente",
    TIENDA: "Empleado de tienda",
    BODEGA: "Empleado de bodega",
};

const { ADMIN, GERENTE, TIENDA, BODEGA } = ROLES;

// Estos roles pueden entrar a cada módulo (datos de prueba, RF32)

export const ACCESO = {
    todos: [ADMIN, GERENTE, TIENDA, BODEGA],
    usuarios: [ADMIN],
    inventario: [ADMIN, GERENTE, TIENDA, BODEGA],
    ventas: [ADMIN, GERENTE, TIENDA],
    pedidos: [ADMIN, GERENTE, TIENDA, BODEGA],
    proveedores: [ADMIN, GERENTE, BODEGA],
    reportes: [ADMIN, GERENTE],
    auditoria: [ADMIN, GERENTE],
};

// Menú lateral. "sub" son las pantallas de cada módulo.

export const MENU = [
    {
        etiqueta: "Dashboard",
        base: "/dashboard",
        ruta: "/dashboard",
        roles: ACCESO.todos,
    },
    {
        etiqueta: "Usuarios",
        base: "/usuarios",
        ruta: "/usuarios/registrar",
        roles: ACCESO.usuarios,
        sub: [
            { etiqueta: "Registrar usuario", ruta: "/usuarios/registrar" },
            { etiqueta: "Asignar roles", ruta: "/usuarios/roles" },
        ],
    },
    {
        etiqueta: "Inventario",
        base: "/inventario",
        ruta: "/inventario",
        roles: ACCESO.inventario,
        sub: [
            { etiqueta: "Inventario general", ruta: "/inventario" },
            { etiqueta: "Entrada", ruta: "/inventario/entrada" },
            { etiqueta: "Salida", ruta: "/inventario/salida" },
            { etiqueta: "Actualizar", ruta: "/inventario/actualizar" },
        ],
    },
    {
        etiqueta: "Ventas",
        base: "/ventas",
        ruta: "/ventas/registrar",
        roles: ACCESO.ventas,
        sub: [
            { etiqueta: "Registrar venta", ruta: "/ventas/registrar" },
            { etiqueta: "Historial de ventas", ruta: "/ventas" },
        ],
    },
    {
        etiqueta: "Pedidos",
        base: "/pedidos",
        ruta: "/pedidos",
        roles: ACCESO.pedidos,
        sub: [
            { etiqueta: "Lista de pedidos", ruta: "/pedidos" },
            { etiqueta: "Crear pedido", ruta: "/pedidos/crear" },
            { etiqueta: "Aprobar pedidos", ruta: "/pedidos/aprobar" },
            { etiqueta: "Despachar pedidos", ruta: "/pedidos/despachar" },
        ],
    },
    {
        etiqueta: "Proveedores",
        base: "/proveedores",
        ruta: "/proveedores",
        roles: ACCESO.proveedores,
        sub: [
            { etiqueta: "Lista", ruta: "/proveedores" },
            { etiqueta: "Registrar", ruta: "/proveedores/registrar" },
            { etiqueta: "Devolución", ruta: "/proveedores/devolucion" },
        ],
    },
    {
        etiqueta: "Reportes",
        base: "/reportes",
        ruta: "/reportes/ventas",
        roles: ACCESO.reportes,
        sub: [
            { etiqueta: "Ventas", ruta: "/reportes/ventas" },
            { etiqueta: "Inventario", ruta: "/reportes/inventario" },
            { etiqueta: "Agotados", ruta: "/reportes/agotados" },
            { etiqueta: "Rotación", ruta: "/reportes/rotacion" },
        ],
    },
    {
        etiqueta: "Notificaciones",
        base: "/notificaciones",
        ruta: "/notificaciones",
        roles: ACCESO.todos,
    },
    {
        etiqueta: "Auditoría",
        base: "/auditoria",
        ruta: "/auditoria",
        roles: ACCESO.auditoria,
        sub: [
            { etiqueta: "Registro", ruta: "/auditoria" },
            { etiqueta: "Historial", ruta: "/auditoria/historial" },
        ],
    },
];
