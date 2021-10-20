/*
Ruta: /api/Locales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar‐campos');
//const { validarJWT } = require('../middlewares/validar‐jwt');
const { getLocales, crearLocal, actualizarLocal, eliminarLocal } = require('../controllers/locales.controller');
const router = Router();

router.get('/', getLocales);
router.post('/', [
        check('nombre_local', 'El nombre del local es obligatorio').not().isEmpty(),
        check('direccion', 'La dirección es obligatoria').not().isEmpty(),
        check('costo', 'El costo es obligatorio').not().isEmpty(),
        check('disponibilidad', 'El estado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearLocal);

router.put('/:id', [
        check('nombre_local', 'El nombre del local es obligatorio').not().isEmpty(),
        check('direccion', 'La dirección es obligatoria').not().isEmpty(),
        check('costo', 'El costo es obligatorio').not().isEmpty(),
        check('disponibilidad', 'El estado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarLocal);

router.delete('/:id', eliminarLocal);
module.exports = router;