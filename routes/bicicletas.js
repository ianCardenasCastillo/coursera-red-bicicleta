var express = require('express');
var router = express.Router();


/**
 * Se exporta el controlador de bicicleta que contiene todos los 
 * Middleware de bicicleta
 */
var bicicletaController = require('../controllers/bicicleta')
var handlersBicicleta = bicicletaController(); // Se instancia? un handlers de bicicletas

/* GET users listing. */
router.get('/', handlersBicicleta.bicicletaList);
router.get('/create', handlersBicicleta.bicicletaCreateGet);
router.post('/create', handlersBicicleta.bicicletaCreatePost);
router.get('/:id/update', handlersBicicleta.bicicletaUpdateGet);
router.post('/:id/update', handlersBicicleta.bicicletaUpdatePost);
router.post('/:id/delete', handlersBicicleta.bicicletaDelete); 

module.exports = router; // Se exporta el router
