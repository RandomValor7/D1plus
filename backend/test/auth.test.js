process.env.JWT_SECRET = "clave_de_prueba";
process.env.JWT_EXPIRES_IN = "1h";

const test = require("node:test");
const assert = require("node:assert");
const {
    encriptarPassword,
    compararPassword,
    generarToken,
    verificarJwt
} = require("../app/utils/auth");

const usuario = {
    id_usuario: 7,
    correo: "ana@d1plus.com",
    nombre_rol: "Gerente",
    contrasena: "no-debe-ir-en-el-token"
};

test("encriptarPassword no deja la clave en texto plano", async () => {
    const hash = await encriptarPassword("Admin123");
    assert.notStrictEqual(hash, "Admin123");
    assert.ok(hash.startsWith("$2"));
});

test("dos hashes de la misma clave son distintos", async () => {
    const a = await encriptarPassword("Admin123");
    const b = await encriptarPassword("Admin123");
    assert.notStrictEqual(a, b);
});
test("compararPassword acepta la clave correcta", async () => {
    const hash = await encriptarPassword("Admin123");
    assert.strictEqual(await compararPassword("Admin123", hash), true);
});

test("compararPassword rechaza una clave incorrecta", async () => {
    const hash = await encriptarPassword("Admin123");
    assert.strictEqual(await compararPassword("otra", hash), false);
});

test("generarToken guarda id, correo y rol", () => {
    const datos = verificarJwt(generarToken(usuario));
    assert.strictEqual(datos.id, 7);
    assert.strictEqual(datos.correo, "ana@d1plus.com");
    assert.strictEqual(datos.rol, "Gerente");
});

test("el token nunca lleva la contrasena", () => {
    const datos = verificarJwt(generarToken(usuario));
    assert.strictEqual(datos.contrasena, undefined);
});

test("verificarJwt rechaza un token alterado", () => {
    const token = generarToken(usuario);
    assert.throws(() => verificarJwt(token + "x"));
});

test("verificarJwt rechaza un token vencido", () => {
    process.env.JWT_EXPIRES_IN = "-10s";
    const token = generarToken(usuario);
    process.env.JWT_EXPIRES_IN = "1h";
    assert.throws(
        () => verificarJwt(token),
        { name: "TokenExpiredError" }
    );
});

test("generarToken falla si falta JWT_SECRET", () => {
    const guardado = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    assert.throws(() => generarToken(usuario), /JWT_SECRET/);
    process.env.JWT_SECRET = guardado;
});

const {
    generarTokenReset,
    leerTokenReset,
    verificarTokenReset
} = require("../app/utils/auth");
test("el token de recuperacion se puede leer y verificar", () => {
    const token = generarTokenReset({ id_usuario: 7, contrasena: "$2b$x" });
    assert.strictEqual(leerTokenReset(token).id, 7);
    assert.ok(verificarTokenReset(token, { contrasena: "$2b$x" }));
});

test("el token de recuperacion deja de servir al cambiar la clave", () => {
    const token = generarTokenReset({ id_usuario: 7, contrasena: "$2b$x" });
    assert.throws(() =>
        verificarTokenReset(token, { contrasena: "$2b$nueva" })
    );
});

test("un token de inicio de sesion no sirve para recuperar", () => {
    assert.strictEqual(leerTokenReset(generarToken(usuario)), null);
});

test("un token de recuperacion no sirve para iniciar sesion", () => {
    const token = generarTokenReset({ id_usuario: 7, contrasena: "$2b$x" });
    assert.throws(() => verificarJwt(token));
});

