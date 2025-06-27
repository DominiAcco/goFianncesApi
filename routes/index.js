const express = require('express');
const router = express.Router();

const transacaoRoutes = require('./transacao');

router.use('/transacao',transacaoRoutes);

module.exports = router;