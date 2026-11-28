export const ROLES = {
    ADMIN: "Administrador",
    GERENTE: "Gerente",
    TIENDA: "Empleado de tienda",
    BODEGA: "Empleado de bodega",
};

const { ADMIN, GERENTE, TIENDA, BODEGA } = ROLES;
// Estos roles pueden entrar a cada modulo y a cada pantalla.
// Son los mismos que valida el backend (backend/app/config/permisos.js):

export const ACCESO = {
    todos: [ADMIN, GERENTE, TIENDA, BODEGA],
    usuarios: [ADMIN],
    inventario: [ADMIN, GERENTE, TIENDA, BODEGA],
    moverInventario: [ADMIN, GERENTE, BODEGA],
    ventas: [ADMIN, GERENTE, TIENDA],
    anularVentas: [ADMIN, GERENTE],
    pedidos: [ADMIN, GERENTE, TIENDA, BODEGA],
    pedir: [ADMIN, GERENTE, TIENDA],
    despachar: [ADMIN, GERENTE, BODEGA],
    proveedores: [ADMIN, GERENTE, BODEGA],
    registrarProveedor: [ADMIN, GERENTE],
    devoluciones: [ADMIN, GERENTE, BODEGA],
    reportes: [ADMIN, GERENTE],
    auditoria: [ADMIN, GERENTE],
};

// Menu lateral. "sub" son las pantallas de cada modulo
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

            {
                etiqueta: "Entrada",
                ruta: "/inventario/entrada",
                roles: ACCESO.moverInventario,
            },

            {
                etiqueta: "Salida",
                ruta: "/inventario/salida",
                roles: ACCESO.moverInventario,
            },

            {
                etiqueta: "Actualizar",
                ruta: "/inventario/actualizar",
                roles: ACCESO.moverInventario,
            },
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

            {
                etiqueta: "Crear pedido",
                ruta: "/pedidos/crear",
                roles: ACCESO.pedir,
            },

            {
                etiqueta: "Aprobar pedidos",
                ruta: "/pedidos/aprobar",
                roles: ACCESO.despachar,
            },

            {
                etiqueta: "Despachar pedidos",
                ruta: "/pedidos/despachar",
                roles: ACCESO.despachar,
            },
        ],
    },

    {
        etiqueta: "Proveedores",
        base: "/proveedores",
        ruta: "/proveedores",
        roles: ACCESO.proveedores,
        sub: [
            { etiqueta: "Lista", ruta: "/proveedores" },

            {
                etiqueta: "Registrar",
                ruta: "/proveedores/registrar",
                roles: ACCESO.registrarProveedor,
            },

            {
                etiqueta: "Devolucion",
                ruta: "/proveedores/devolucion",
                roles: ACCESO.devoluciones,
            },
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
            { etiqueta: "Rotacion", ruta: "/reportes/rotacion" },
        ],
    },

    {
        etiqueta: "Notificaciones",
        base: "/notificaciones",
        ruta: "/notificaciones",
        roles: ACCESO.todos,
    },

    {
        etiqueta: "Auditoria",
        base: "/auditoria",
        ruta: "/auditoria",
        roles: ACCESO.auditoria,
        sub: [
            { etiqueta: "Registro", ruta: "/auditoria" },
            { etiqueta: "Historial", ruta: "/auditoria/historial" },
        ],
    },
];
