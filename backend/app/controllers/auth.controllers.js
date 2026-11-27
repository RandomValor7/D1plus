//valida los campos, compara la contraseña, revisa que el usuario esté activo, 
//registra el inicio de  sesión en auditoria y devuelve el token

const { AuditoriaModel, UsuarioModel } = require("../models");

const { faltanCampos, manejarError } =
    require("../utils/errores");
const { compararPassword, generarToken } =
    require("../utils/auth");
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

module.exports = { login, me };

