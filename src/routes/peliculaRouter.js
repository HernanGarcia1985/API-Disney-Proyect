const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');
var cors = require('cors');
var authToken = require('../middlewares/authToken');


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/movies',cors(corsOptions),authToken,peliculaController.todasLasPeliculas);

router.get('/movies/:id',cors(corsOptions),authToken,peliculaController.peliculaPorId);

router.post('/movies',cors(corsOptions),authToken,peliculaController.peliculaCreate);

router.put('/movies/:id',cors(corsOptions),authToken,peliculaController.peliculaUpdate);

router.delete('/movies/:id',cors(corsOptions),authToken,peliculaController.peliculaDestroy);

router.get('/movies?name',cors(corsOptions),authToken,peliculaController.peliculasPorTitulo);

router.get('/movies?genre',cors(corsOptions),authToken,peliculaController.peliculasPorGeneroId);

module.exports = router;