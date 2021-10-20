/*
Ruta: /api/Certificados
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar‐campos');

const { validarJWT } = require('../middlewares/validar‐jwt');
const { crearCertificado, getCertificados, actualizarCertificados, eliminarCertificado } = require('../controllers/certificados.controller');
const router = Router();

router.get('/', validarJWT, getCertificados);
router.post('/', [
        check('nombre_certificado', 'El nombre del certificado es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('costo', 'El costo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCertificado);
router.put('/:id', [validarJWT,
        check('nombre_certificado', 'El nombre del certificado es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('costo', 'El costo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCertificados);

router.delete('/:id', eliminarCertificado);

module.exports = router;