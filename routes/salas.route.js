/*
Ruta: /api/Salas
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar‐campos');
const { crearSala, getSalas, actualizarSala, eliminarSala } = require('../controllers/salas.controller');

const { validarJWT } = require('../middlewares/validar‐jwt');
const router = Router();

router.get('/', getSalas);
router.post('/:_id', [
        check('nombre_sala', 'El nombre es obligatorio').not().isEmpty(),
        check('url', 'El URL es obligatorio').not().isEmpty(),
        check('disponibilidad', 'El disponibilidad es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearSala);

router.put('/:id', [
        check('nombre_sala', 'El nombre es obligatorio').not().isEmpty(),
        check('url', 'El URL es obligatorio').not().isEmpty(),
        check('disponibilidad', 'El disponibilidad es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarSala);
router.delete('/:id', eliminarSala);

module.exports = router;