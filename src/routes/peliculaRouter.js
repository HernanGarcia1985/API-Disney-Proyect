const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');
var cors = require('cors');


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/movies',cors(corsOptions),peliculaController.todasLasPeliculas);

router.get('/movies/:id',cors(corsOptions),peliculaController.peliculaPorId);

router.post('/movies',cors(corsOptions),peliculaController.peliculaCreate);

router.put('/movies/:id',cors(corsOptions),peliculaController.peliculaUpdate);

router.delete('/movies/:id',cors(corsOptions),peliculaController.peliculaDestroy);

router.get('/movies?name',cors(corsOptions),peliculaController.peliculasPorTitulo);

router.get('/movies?genre',cors(corsOptions),peliculaController.peliculasPorGeneroId);