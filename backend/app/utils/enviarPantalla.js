const path = require('path');

const CARPETA_PUBLIC = path.join(__dirname, '..', 'public');

function enviarPantalla(nombreArchivo) {
  return (req, res) => {
    res.sendFile(path.join(CARPETA_PUBLIC, nombreArchivo));
  };
}

module.exports = enviarPantalla;