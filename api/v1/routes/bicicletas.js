var express = require('express');
var router = express.Router();

/**
 * Se exporta los endpoints de la bicicleta que retorna un res
 */
var bicicletasEndpoints = require('../endpoints/bicicleta');
var handlersBicicleta = bicicletasEndpoints();


/* GET users listing. */
router.get('/', handlersBicicleta.bicicletaList);
router.post('/', handlersBicicleta.bicicletaCreate);
router.delete('/:id', handlersBicicleta.bicicletaDelete);
router.put('/:id', handlersBicicleta.bicicletaUpdate);

module.exports = router; // Se exporta el router
