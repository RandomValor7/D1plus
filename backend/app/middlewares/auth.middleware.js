const { verificarJwt } = require("../utils/auth");

// Exige el encabezado Authorization: Bearer <token>
const verificarToken = (req, res, next) => {
 const encabezado = req.headers.authorization ?? "";
 const [tipo, token] = encabezado.split(" ");
 if (tipo !== "Bearer" || !token) {
 return res.status(401).json({
 mensaje: "Token no enviado o invalido"
 });
 }
 try {
 req.usuario = verificarJwt(token);
 next();
 } catch (error) {
 const vencido = error.name === "TokenExpiredError";
 res.status(401).json({
 mensaje: vencido
 ? "La sesion expiro, inicia sesion de nuevo"
 : "Token no enviado o invalido"
 });
 }
};

// Revisa el rol del usuario segun el metodo de la peticion
const permitir = ({ leer, escribir }) => (req, res, next) => {
 const roles = req.method === "GET" ? leer : escribir;
 if (!roles.includes(req.usuario.rol)) {
 return res.status(403).json({
 mensaje: "No tienes permisos para esta accion"
 });
 }
 next();
};

// Para rutas de negocio: solo los roles de la lista
const autorizarRoles = (...roles) => (req, res, next) => {
 if (!roles.flat().includes(req.usuario.rol)) {
 return res.status(403).json({
 mensaje: "No tienes permisos para esta accion"
 });
 }
 next();
};

module.exports = { verificarToken, permitir, autorizarRoles };

