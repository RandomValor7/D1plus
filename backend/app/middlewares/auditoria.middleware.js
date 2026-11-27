const { AuditoriaModel } = require("../models");

// RF37: registra en auditoria toda accion que modifica datos
// (POST, PUT, PATCH, DELETE) y que termino bien
const auditar = (req, res, next) => {
    if (req.method === "GET") {
        return next();
    }
    res.on("finish", () => {
        if (res.statusCode >= 400 || !req.usuario) {
            return;
        }
        const ruta = req.originalUrl.split("?")[0];
        AuditoriaModel.create({
            accion: (req.method + " " + ruta).slice(0, 100),
            descripcion: "Respuesta " + res.statusCode,
            id_usuario: req.usuario.id
        }).catch((error) => console.error(error));
    });
    next();
};

module.exports = { auditar };

