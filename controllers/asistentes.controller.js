const { response } = require('express');

const Asistente = require('../models/asistente.model');

const getAsistentes = async(req, res = response) => {

    const asistentes = await Asistente.find()
        .populate('taller', 'fecha_inicio fecha_fin tema costo')
        .populate('local', 'nombre_local direccion costo')
        .populate('ponente', 'nombre apellidos dni salario')
        .populate('webinar', 'webinar_tema costo')
        .populate('certificado', 'nombre_certificado costo')
        .populate('sala', 'nombre_sala costo')


    res.json({
        ok: true,
        asistentes: asistentes
    })
}

const crearAsistente = async(req, res = response) => {

    const uid = req.uid;
    const asistente = new Asistente({
        asistente: uid,
        ...req.body
    });


    try {

        const asistenteDB = await asistente.save();


        res.json({
            ok: true,
            asistente: asistenteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el asistente, consulte con el administrador'
        })
    }


}

const actualizarAsistente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const asistente = await Asistente.findById(id);

        if (!asistente) {
            return res.status(404).json({
                ok: true,
                msg: 'Asistente no encontrado por id',
            });
        }

        const cambiosAsistente = {
            ...req.body,
            asistente: uid
        }

        const asistenteActualizado = await Asistente.findByIdAndUpdate(id, cambiosAsistente, { new: true });


        res.json({
            ok: true,
            asistente: asistenteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el asistente, consulte con el administrador'
        })
    }

}

const eliminarAsistente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const asistente = await Asistente.findById(id);

        if (!asistente) {
            return res.status(404).json({
                ok: true,
                msg: 'Asistente no encontrado por id',
            });
        }

        await Asistente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Asistente borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Asistente no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getAsistentes,
    crearAsistente,
    actualizarAsistente,
    eliminarAsistente,
}