// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require("cors"); // para las peticiones

const reviews = require(__dirname + '/routes/reviews');   
const users = require(__dirname + '/routes/users');  

mongoose.connect('mongodb://mymongodb/FunBox',            // Conectar con BD en Mongo
    {useNewUrlParser: true});

let app = express();                                            // Inicializar Express

app.use(cors());

app.use(express.json({limit: "10mb", extended: true}));

app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));

app.use(methodOverride(function (req, res) {                    // Middleware para procesar otras peticiones que no sean GET o POST
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

app.use('/reviews', reviews);
app.use('/users', users);

app.listen(8080);                                               // Puesta en marcha del servidor