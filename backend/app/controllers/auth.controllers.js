//valida los campos, compara la contraseña, revisa que el usuario esté activo, 
//registra el inicio de  sesión en auditoria y devuelve el token

const { AuditoriaModel, UsuarioModel } = require("../models");

const { faltanCampos, manejarError } =
    require("../utils/errores");
const {
    compararPassword,
    encriptarPassword,
    generarToken,
    generarTokenReset,
    leerTokenReset,
    verificarTokenReset
} = require("../utils/auth");
const login = async (req, res) => {
    try {
        const requeridos = ["correo", "contrasena"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const { correo, contrasena } = req.body;
        const usuario = await UsuarioModel.getByCorreo(correo);
        const valida = usuario
            && await compararPassword(contrasena, usuario.contrasena);
        // Mismo mensaje si falla el correo o la clave
        if (!valida) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }
        if (usuario.estado !== 1) {
            return res.status(403).json({
                mensaje: "Usuario inactivo"
            });
        }
        await AuditoriaModel.create({
            accion: "Inicio de sesion",
            id_usuario: usuario.id_usuario,
            descripcion: "Inicio de sesion de " + usuario.correo
        });
        res.json({
            mensaje: "Inicio de sesion exitoso",
            token: generarToken(usuario),
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                cargo: usuario.cargo,
                rol: usuario.nombre_rol
            }
        });
    } catch (error) {
        manejarError(res, error, "iniciar sesion");
    }
};

// Datos del usuario dueno del token (ruta protegida)
const me = async (req, res) => {
    try {
        const usuario = await UsuarioModel.getById(req.usuario.id);
        if (!usuario || usuario.estado !== 1) {
            return res.status(401).json({
                mensaje: "Usuario no disponible"
            });
        }
        res.json({ ...usuario, rol: req.usuario.rol });
    } catch (error) {
        manejarError(res, error, "consultar sesion");
    }
};

// RF04: pide el enlace para recuperar la contrasena
const recuperar = async (req, res) => {
    try {
        if (faltanCampos(res, req.body, ["correo"])) {
            return;
        }
        const usuario = await UsuarioModel.getByCorreo(req.body.correo);
        if (usuario && usuario.estado === 1) {
            const token = generarTokenReset(usuario);
            // Aqui se enviaria por correo. Mientras no haya servidor
            // de correo, el enlace se muestra en la consola del servidor
            console.log(
                "Recuperacion para " + usuario.correo +
                ": /restablecer?token=" + token
            );
        }
        // Misma respuesta exista o no el correo
        res.json({
            mensaje: "Si el correo existe, se envio un enlace"
        });
    } catch (error) {
        manejarError(res, error, "recuperar contrasena");
    }
};

// RF04: pone la contrasena nueva usando el token del enlace
const restablecer = async (req, res) => {
    try {
        const requeridos = ["token", "contrasena"];
        if (faltanCampos(res, req.body, requeridos)) {
            return;
        }
        const { token, contrasena } = req.body;
        if (String(contrasena).length < 6) {
            return res.status(400).json({
                mensaje: "La contrasena debe tener minimo 6 letras"
            });
        }
        const invalido = { mensaje: "El enlace no es valido o vencio" };
        const datos = leerTokenReset(token);
        const usuario = datos && await UsuarioModel.getParaReset(datos.id);
        if (!usuario || usuario.estado !== 1) {
            return res.status(400).json(invalido);
        }
        try {
            verificarTokenReset(token, usuario);
        } catch {
            return res.status(400).json(invalido);
        }
        await UsuarioModel.cambiarClave(
            usuario.id_usuario,
            await encriptarPassword(contrasena)
        );
        await AuditoriaModel.create({
            accion: "Restablecer contrasena",
            id_usuario: usuario.id_usuario,
            descripcion: "Contrasena restablecida de " + usuario.correo
        });
        res.json({ mensaje: "Contrasena actualizada" });
    } catch (error) {
        manejarError(res, error, "restablecer contrasena");
    }
};

module.exports = { login, me, recuperar, restablecer };

