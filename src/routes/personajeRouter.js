const express = require('express');
const router = express.Router();
const personajeController = require('../controllers/personajeController');
var cors = require('cors');
var authToken = require('../middlewares/authToken');


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/characters',cors(corsOptions),authToken,personajeController.todosLosPersonajes);

router.get('/characters/:id',cors(corsOptions),authToken,personajeController.personajesPorId);

router.post('/characters',cors(corsOptions),authToken,personajeController.personajesCreate);

router.put('/characters/:id',cors(corsOptions),authToken,personajeController.personajesUpdate);

router.delete('/characters/:id',cors(corsOptions),authToken,personajeController.personajesDestroy);

router.get('/characters?name',cors(corsOptions),authToken,personajeController.personajesPorNombre);

router.get('/characters?age',cors(corsOptions),authToken,personajeController.personajesPorEdad);

router.get('/characters?weight',cors(corsOptions),authToken,personajeController.personajesPorPeso);

router.get('/characters?movie',cors(corsOptions),authToken,personajeController.personajesPorPeliculaId);

module.exports = router;