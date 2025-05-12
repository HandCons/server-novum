const express = require('express');
const router = express.Router();
const { sincronizarClientes } = require('../controllers/clienteController');

router.get('/clientes', sincronizarClientes);

module.exports = router;
