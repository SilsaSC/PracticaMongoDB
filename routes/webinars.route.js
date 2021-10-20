/*
    Path: /api/webinars
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getWebinars, actualizarWebinar, eliminarWebinar, asignarPonente, crearWebinar } = require('../controllers/webinars.controller');

const { validarCampos } = require('../middlewares/validar‐campos');

const router = Router();

router.get('/', getWebinars);
router.post('/:_id', [
        check('webinar_tema', 'El tema del webinar es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'La fecha de inicio del webinar es obligatorio').not().isEmpty(),
        check('fecha_fin', 'La fecha de fin del webinar es obligatorio').not().isEmpty(),
        check('costo', 'El costo del webinar es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearWebinar);
router.put('/:id', [
        check('webinar_tema', 'El tema del webinar es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'La fecha de inicio del webinar es obligatorio').not().isEmpty(),
        check('fecha_fin', 'La fecha de fin del webinar es obligatorio').not().isEmpty(),
        check('costo', 'El costo del webinar es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarWebinar);

router.delete('/:id', eliminarWebinar);

router.put('/asignarPonente/:id', [
        check('ponente', 'El id del ponente debe de ser válido').isMongoId(),
        validarCampos,
    ],
    asignarPonente);

module.exports = router;