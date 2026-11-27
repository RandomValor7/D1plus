// Uso: node --env-file=.env scripts/cifrar-contrasenas.js
// Cifra las contrasenas que quedaron en texto plano
const db = require("../app/config/db");
const { encriptarPassword } = require("../app/utils/auth");

const main = async () => {
    const [usuarios] = await db.query(
        "SELECT id_usuario, contrasena FROM usuario"
    );
    let cifradas = 0;
    for (const u of usuarios) {
        // Un hash de bcrypt siempre empieza por $2
        if (u.contrasena.startsWith("$2")) {
            continue;
        }
        const hash = await encriptarPassword(u.contrasena);
        await db.query(
            "UPDATE usuario SET contrasena = ? WHERE id_usuario = ?",
            [hash, u.id_usuario]
        );
        cifradas++;
    }
    console.log("Contrasenas cifradas: " + cifradas);
};

main()
    .catch((error) => console.error("Error:", error.message))
    .finally(() => process.exit());
