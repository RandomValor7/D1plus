// Uso: node --env-file=.env scripts/crear-admin.js correo clave
// Crea el primer administrador con la contrasena cifrada
const db = require("../app/config/db");
const { ROLES } = require("../app/config/permisos");
const { encriptarPassword } = require("../app/utils/auth");
const [correo, contrasena] = process.argv.slice(2);

const main = async () => {
    if (!correo || !contrasena) {
        console.log("Uso: scripts/crear-admin.js correo clave");
        return;
    }
    const [roles] = await db.query(
        "SELECT id_rol FROM rol WHERE nombre_rol = ?",
        [ROLES.ADMIN]
    );
    if (roles.length === 0) {
        console.log("Primero ejecuta scripts/crear-roles.js");
        return;
    }
    const hash = await encriptarPassword(contrasena);
    await db.query(
        `INSERT INTO usuario
 (nombre, correo, contrasena, cargo, id_rol)
 VALUES (?, ?, ?, ?, ?)`,
        [
            "Administrador",
            correo,
            hash,
            "Administrador del sistema",
            roles[0].id_rol
        ]
    );
    console.log("Administrador creado: " + correo);
};
main()
    .catch((error) => console.error("Error:", error.message))
    .finally(() => process.exit());

