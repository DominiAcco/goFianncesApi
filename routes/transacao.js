const exprees = require ('express');
const router = exprees.Router();
const transacaoController = require('../controllers/transacaoController');

router.post('/', transacaoController.criarTransacao);
router.get('/', transacaoController.listarTransacao);
 
module.exports = router