var express = require('express');
var router = express.Router();

/**
 * Se exporta los endpoints de la bicicleta que retorna un res
 */
var usuariosEndpoints = require('../endpoints/usuario');
var handlersUsuario = usuariosEndpoints();


/* GET users listing. */
router.get('/', handlersUsuario.usuariosList);
router.post('/', handlersUsuario.usuariosCreate);
router.post('/reserva', handlersUsuario.usuariosReservar);

module.exports = router; // Se exporta el router
