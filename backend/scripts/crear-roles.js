// Uso: node --env-file=.env scripts/crear-roles.js
// Crea los 4 roles del sistema si todavia no existen
const db = require("../app/config/db");
const { ROLES } = require("../app/config/permisos");

const main = async () => {
    for (const nombre of Object.values(ROLES)) {
        const [filas] = await db.query(
            "SELECT id_rol FROM rol WHERE nombre_rol = ?",
            [nombre]
        );
        if (filas.length > 0) {
            console.log("Ya existe: " + nombre);
            continue;
        }
        await db.query(
            "INSERT INTO rol (nombre_rol) VALUES (?)",
            [nombre]
        );
        console.log("Creado: " + nombre);
    }
};
main()
    .catch((error) => console.error("Error:", error.message))
    .finally(() => process.exit());
