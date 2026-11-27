process.env.JWT_SECRET = "clave_de_prueba";
process.env.JWT_EXPIRES_IN = "1h";

const test = require("node:test");
const assert = require("node:assert");
const { generarToken } = require("../app/utils/auth");
const { verificarToken, permitir } =
    require("../app/middlewares/auth.middleware");

const usuario = {
    id_usuario: 1,
    correo: "ana@d1plus.com",
    nombre_rol: "Gerente"
};

// Respuesta falsa: guarda el codigo y el cuerpo que se envian
const crearRes = () => {
    const res = {};
    res.status = (codigo) => {
        res.codigo = codigo;
        return res;
    };
    res.json = (cuerpo) => {
        res.cuerpo = cuerpo;
        return res;
    };
    return res;
};

const ejecutar = (middleware, req) => {
    const res = crearRes();
    let paso = false;
    middleware(req, res, () => {
        paso = true;
    });
    return { res, paso };
};

test("verificarToken: sin encabezado responde 401", () => {
    const { res, paso } = ejecutar(verificarToken, { headers: {} });
    assert.strictEqual(res.codigo, 401);
    assert.strictEqual(paso, false);
});

test("verificarToken: esquema distinto de Bearer da 401", () => {
    const req = { headers: { authorization: "Basic abc" } };
    const { res } = ejecutar(verificarToken, req);
    assert.strictEqual(res.codigo, 401);
});

test("verificarToken: token falso da 401", () => {
    const req = { headers: { authorization: "Bearer falso" } };
    const { res, paso } = ejecutar(verificarToken, req);
    assert.strictEqual(res.codigo, 401);
    assert.strictEqual(paso, false);
});

test("verificarToken: token vencido avisa que expiro", () => {
    process.env.JWT_EXPIRES_IN = "-10s";
    const token = generarToken(usuario);
    process.env.JWT_EXPIRES_IN = "1h";
    const req = { headers: { authorization: "Bearer " + token } };
    const { res } = ejecutar(verificarToken, req);
    assert.strictEqual(res.codigo, 401);
    assert.match(res.cuerpo.mensaje, /expiro/);
});

test("verificarToken: token valido deja pasar y llena req.usuario", () => {
    const token = generarToken(usuario);
    const req = { headers: { authorization: "Bearer " + token } };
    const { paso } = ejecutar(verificarToken, req);
    assert.strictEqual(paso, true);
    assert.strictEqual(req.usuario.rol, "Gerente");
});

const reglas = {
    leer: ["Gerente", "Administrador"],
    escribir: ["Administrador"]
};

test("permitir: rol con permiso de lectura puede hacer GET", () => {
    const req = { method: "GET", usuario: { rol: "Gerente" } };
    const { paso } = ejecutar(permitir(reglas), req);
    assert.strictEqual(paso, true);
});

test("permitir: rol sin permiso de escritura recibe 403", () => {
    const req = { method: "POST", usuario: { rol: "Gerente" } };
    const { res, paso } = ejecutar(permitir(reglas), req);
    assert.strictEqual(res.codigo, 403);
    assert.strictEqual(paso, false);
});

test("permitir: el administrador puede escribir", () => {
    const req = { method: "DELETE", usuario: { rol: "Administrador" } };
    const { paso } = ejecutar(permitir(reglas), req);
    assert.strictEqual(paso, true);
});

test("permitir: un rol que no esta en la lista recibe 403", () => {
    const req = { method: "GET", usuario: { rol: "Empleado de bodega" } };
    const { res } = ejecutar(permitir(reglas), req);
    assert.strictEqual(res.codigo, 403);
});
