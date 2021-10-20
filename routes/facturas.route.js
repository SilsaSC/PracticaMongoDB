/*
    Path: /api/webinars
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getFactura, crearFactura, actualizarFactura, eliminarFactura } = require('../controllers/facturas.controller');

const { validarCampos } = require('../middlewares/validar‐campos');

const router = Router();

router.get('/', getFactura);
router.post('/', [
        check('fecha', 'El la decha de la factura es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la factura es obligatorio').not().isEmpty(),
        check('local', 'El id del local debe de ser válido').isMongoId(),
        check('ponente', 'El id del ponente debe de ser válido').isMongoId(),
        check('usuario', 'El id del usuario debe de ser válido').isMongoId(),
        check('certificado', 'El id del certificado debe de ser válido').isMongoId(),
        check('sala', 'El id de la sala debe de ser válido').isMongoId(),
        validarCampos,
    ],
    crearFactura);
router.put('/:id', [
        check('fecha', 'El la decha de la factura es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la factura es obligatorio').not().isEmpty(),
        check('local', 'El id del local debe de ser válido').isMongoId(),
        check('ponente', 'El id del ponente debe de ser válido').isMongoId(),
        check('usuario', 'El id del usuario debe de ser válido').isMongoId(),
        check('certificado', 'El id del certificado debe de ser válido').isMongoId(),
        check('sala', 'El id de la sala debe de ser válido').isMongoId(),
        validarCampos,
    ],
    actualizarFactura);

router.delete('/:id', eliminarFactura);

module.exports = router;