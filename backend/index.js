const app = require('./app/server');
const PUERTO = 3000;
app.listen(PUERTO, () => {
 console.log(`Servidor D1pluS en http://localhost:${PUERTO}`);
});
