const { Router } = require('express');
const { busquedaTotal } = require('../controllers/busquedas.controller');
//const {} = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:busqueda', busquedaTotal);

module.exports = router;