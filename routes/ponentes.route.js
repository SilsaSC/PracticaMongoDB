/*
Ruta: /api/Ponentes
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar‐campos');
const { crearPonente, EliminarPonente, ActualizarPonente, getPonentes, asignarWebinar } = require('../controllers/ponentes.controller');

const { validarJWT } = require('../middlewares/validar‐jwt');
const router = Router();

router.get('/', getPonentes);


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El apellidos es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('salario', 'El salario es obligatorio').not().isEmpty(),
        check('disponibilidad', 'El disponibilidad es obligatorio').not().isEmpty(),

        validarCampos,
    ],
    crearPonente);

router.put('/:id', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El apellidos es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('salario', 'El salario es obligatorio').not().isEmpty(),
        check('disponibilidad', 'El disponibilidad es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    ActualizarPonente);
router.delete('/:id', EliminarPonente);
/*router.post('/asignarWebinar/:id', [
        check('webinar', 'El id del webinar debe de ser válido').isMongoId(),
        validarCampos,
    ],
    asignarWebinar);*/

module.exports = router;