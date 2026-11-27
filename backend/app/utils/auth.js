const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secreto = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Falta JWT_SECRET en el archivo .env");
    }
    return process.env.JWT_SECRET;
};

// Convierte "Admin123" en un hash irreversible ($2b$10$...)
const encriptarPassword = (password) => bcrypt.hash(password, 10);

// Compara la clave escrita con el hash guardado en la base de datos
const compararPassword = (password, hash) =>
    bcrypt.compare(password, hash);

// Crea un token firmado (nunca lleva la contrasena)
const generarToken = (usuario) =>
    jwt.sign(
        {
            id: usuario.id_usuario,
            correo: usuario.correo,
            rol: usuario.nombre_rol
        },
        secreto(),
        { expiresIn: process.env.JWT_EXPIRES_IN ?? "15m" }
    );

// Devuelve los datos del token o lanza un error si no es valido

const verificarJwt = (token) => jwt.verify(token, secreto());

// Token para recuperar la contrasena (RF04). Se firma con el secreto mas la contrasena actual: cuando la clave cambia, el enlace deja de servir, asi que solo se puede usar una vez.
const generarTokenReset = (usuario) =>
    jwt.sign(
        { id: usuario.id_usuario, tipo: "reset" },
        secreto() + usuario.contrasena,
        { expiresIn: "15m" }
    );

// Lee el id del token SIN verificarlo (para buscar al usuario)
const leerTokenReset = (token) => {
    const datos = jwt.decode(token);
    return datos?.tipo === "reset" ? datos : null;
};

const verificarTokenReset = (token, usuario) =>
    jwt.verify(token, secreto() + usuario.contrasena);
module.exports = {
    encriptarPassword,
    compararPassword,
    generarToken,
    verificarJwt,
    generarTokenReset,
    leerTokenReset,
    verificarTokenReset
};

