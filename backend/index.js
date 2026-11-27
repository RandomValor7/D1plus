const app = require('./app/server');
const { generarAlertas } = require('./app/servicios/alertas');
const reglas = require('./app/config/reglas');
const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor D1pluS en http://localhost:${PUERTO}`);
});

// Revisa las alertas al encender y despues cada cierto tiempo
const revisarAlertas = () =>
    generarAlertas().catch((error) => console.error(error));
revisarAlertas();
setInterval(revisarAlertas, reglas.MINUTOS_ENTRE_ALERTAS * 60 * 1000);
