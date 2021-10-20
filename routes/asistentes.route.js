/*
    Path: /api/Asistentes
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getAsistentes, crearAsistente, actualizarAsistente, eliminarAsistente } = require('../controllers/asistentes.controller');

const { validarCampos } = require('../middlewares/validar‐campos');

const router = Router();

router.get('/', getAsistentes);
router.post('/:_id', [
        check('nombre', 'El nombre del asistente es obligatorio').not().isEmpty(),
        check('apellidos', 'los apellidos del asistente son obligatorio').not().isEmpty(),
        check('correo', 'El correo del asistente es obligatorio').not().isEmpty(),
        check('dni', 'El dni del asistente es obligatorio').not().isEmpty(),
        check('celular', 'El celular de asistente asistente es obligatorio').not().isEmpty(),
        check('ponente', 'El id del ponente debe de ser válido').isMongoId(),
        validarCampos,
    ],
    crearAsistente);
router.put('/:id', [
        check('nombre', 'El nombre del asistente es obligatorio').not().isEmpty(),
        check('apellidos', 'los apellidos del asistente son obligatorio').not().isEmpty(),
        check('correo', 'El correo del asistente es obligatorio').not().isEmpty(),
        check('dni', 'El dni del asistente es obligatorio').not().isEmpty(),
        check('celular', 'El celular de asistente asistente es obligatorio').not().isEmpty(),
        check('ponente', 'El id del ponente debe de ser válido').isMongoId(),
        validarCampos,
    ],
    actualizarAsistente);

router.delete('/:id', eliminarAsistente);

module.exports = router;