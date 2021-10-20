const { Router } = require('express');
const { check } = require('express-validator');
const { busquedaTotal, busquedaFactura, busquedaTaller } = require('../controllers/busquedas.controller');
const { validarCampos } = require('../middlewares/validar‐campos');
const { validarJWT } = require('../middlewares/validar‐jwt');
const router = Router();

router.get('/:busqueda', busquedaTotal);

router.get('/:idlocal/:idponente/:iduasurio/:idwebinar/:idcertificado/:idsala', validarJWT, busquedaFactura), [validarJWT,
    check('idlocal', 'El id del local debe de ser válido').isMongoId(),
    check('idponente', 'El id del ponente debe de ser válido').isMongoId(),
    check('iduasurio', 'El id del usuario debe de ser válido').isMongoId(),
    check('idwebinar', 'El id del webinar debe de ser válido').isMongoId(),
    check('idcertificado', 'El id del certificado debe de ser válido').isMongoId(),
    check('idsala', 'El id de la sala debe de ser válido').isMongoId(),
    validarCampos,
];
router.get('/:idlocal/:idponente/:idsala', validarJWT, busquedaTaller), [validarJWT,
    check('idlocal', 'El id del local debe de ser válido').isMongoId(),
    check('idponente', 'El id del ponente debe de ser válido').isMongoId(),
    check('idsala', 'El id de la sala debe de ser válido').isMongoId(),
    validarCampos,
];
module.exports = router;