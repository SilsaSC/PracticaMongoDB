/*
    Path: /api/talleres
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getTalleres, crearTaller, actualizarTaller, eliminarTaller } = require('../controllers/talleres.controller');

const { validarCampos } = require('../middlewares/validar‐campos');

const router = Router();

router.get('/', getTalleres);
router.post('/', [
        check('fecha_inicio', 'La fecha de inicio del webinar es obligatorio').not().isEmpty(),
        check('fecha_fin', 'La fecha de fin del webinar es obligatorio').not().isEmpty(),
        check('tema', 'El tema del taller es obligatorio').not().isEmpty(),
        check('costo', 'El costo del taller es obligatorio').not().isEmpty(),
        check('sala', 'El id de la sala debe de ser válido').isMongoId(),
        check('local', 'El id del local debe de ser válido').isMongoId(),
        validarCampos,
    ],
    crearTaller);
router.put('/:id', [
        check('fecha_inicio', 'La fecha de inicio del webinar es obligatorio').not().isEmpty(),
        check('fecha_fin', 'La fecha de fin del webinar es obligatorio').not().isEmpty(),
        check('tema', 'El tema del taller es obligatorio').not().isEmpty(),
        check('costo', 'El costo del taller es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarTaller);

router.delete('/:id', eliminarTaller);

module.exports = router;