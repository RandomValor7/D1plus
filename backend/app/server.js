const express = require('express');
const path = require('path');
const rutas = require('./routes');
const apiRutas = require('./routes/api'); 
const app = express();

app.use(express.json()); 

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

app.use('/api', apiRutas); 
app.use('/', rutas);

app.use((req, res) => {
 res.status(404).send(
 '<h1>404</h1><p>La ruta ' + req.originalUrl + ' no existe.</p>' +
 '<a href="/login">Volver al login</a>'
 );
});

module.exports = app;
