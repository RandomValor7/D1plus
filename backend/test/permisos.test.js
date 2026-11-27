const test = require("node:test");
const assert = require("node:assert");
const {
    ROLES,
    ACCESO,
    OPERACIONES,
    RECEPTORES_ALERTAS
} = require("../app/config/permisos");

const validos = Object.values(ROLES);
test("hay 4 roles definidos", () => {
    assert.strictEqual(validos.length, 4);
});

test("cada recurso tiene listas leer y escribir", () => {
    for (const [recurso, reglas] of Object.entries(ACCESO)) {
        assert.ok(Array.isArray(reglas.leer), recurso + " sin leer");
        assert.ok(
            Array.isArray(reglas.escribir),
            recurso + " sin escribir"
        );
    }
});

test("todos los roles usados en ACCESO existen en ROLES", () => {
    for (const reglas of Object.values(ACCESO)) {
        for (const rol of [...reglas.leer, ...reglas.escribir]) {
            assert.ok(validos.includes(rol), "Rol desconocido: " + rol);
        }
    }
});

test("quien puede escribir tambien puede leer", () => {
    for (const [recurso, reglas] of Object.entries(ACCESO)) {
        for (const rol of reglas.escribir) {
            assert.ok(reglas.leer.includes(rol), recurso + ": " + rol);
        }
    }
});

test("el administrador entra a todos los recursos", () => {
    for (const reglas of Object.values(ACCESO)) {
        assert.ok(reglas.leer.includes(ROLES.ADMIN));
        assert.ok(reglas.escribir.includes(ROLES.ADMIN));
    }
});

test("las operaciones de negocio usan solo roles validos", () => {
    for (const [nombre, roles] of Object.entries(OPERACIONES)) {
        assert.ok(roles.length > 0, nombre + " sin roles");
        for (const rol of roles) {
            assert.ok(validos.includes(rol), nombre + ": " + rol);
        }
    }
});

test("el administrador puede hacer todas las operaciones", () => {
    for (const roles of Object.values(OPERACIONES)) {
        assert.ok(roles.includes(ROLES.ADMIN));
    }
});

test("el empleado de tienda no recibe alertas de bodega", () => {
    assert.ok(!RECEPTORES_ALERTAS.includes(ROLES.TIENDA));
});
