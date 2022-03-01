const express = require('express');
const router = express.Router();
const personajeController = require('../controllers/personajeController');
var cors = require('cors');


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/characters',cors(corsOptions),personajeController.todosLosPersonajes);

router.get('/characters/:id',cors(corsOptions),personajeController.personajesPorId);

router.post('/characters',cors(corsOptions),personajeController.personajesCreate);

router.put('/characters/:id',cors(corsOptions),personajeController.personajesUpdate);

router.delete('/characters/:id',cors(corsOptions),personajeController.personajesDestroy);

router.get('/characters?name',cors(corsOptions),personajeController.personajesPorNombre);

router.get('/characters?age',cors(corsOptions),personajeController.personajesPorEdad);

router.get('/characters?weight',cors(corsOptions),personajeController.personajesPorPeso);

router.get('/characters?movie',cors(corsOptions),personajeController.personajesPorPeliculaId);

module.exports = router;