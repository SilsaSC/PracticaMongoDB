const { response } = require('express');

const Taller = require('../models/taller.model');

const getTalleres = async(req, res = response) => {

    const talleres = await Taller.find()
        .populate('sala', 'nombre_sala url costo disponibilidad')
        .populate('ponente', 'nombre apellidos dni email disponibilidad')
        .populate('local', 'nombre_local direccion costo disponibilidad')


    res.json({
        ok: true,
        talleres: talleres
    })
}

const crearTaller = async(req, res = response) => {
    const uid = req.uid;
    const taller = new Taller({
        ponente: uid,
        ...req.body
    });


    try {

        const tallerDB = await taller.save();


        res.json({
            ok: true,
            taller: tallerDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el taller, consulte con el administrador'
        })
    }


}

const actualizarTaller = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const taller = await Taller.findById(id);

        if (!taller) {
            return res.status(404).json({
                ok: true,
                msg: 'Taller no encontrado por id',
            });
        }

        const cambiosTaller = {
            ...req.body,
            taller: uid
        }

        const tallerActualizado = await Taller.findByIdAndUpdate(id, cambiosTaller, { new: true });


        res.json({
            ok: true,
            taller: tallerActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el taller, consulte con el administrador'
        })
    }

}

const eliminarTaller = async(req, res = response) => {

    const id = req.params.id;

    try {

        const taller = await Taller.findById(id);

        if (!taller) {
            return res.status(404).json({
                ok: true,
                msg: 'Taller no encontrado por id',
            });
        }

        await Taller.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Taller borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'El taller no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getTalleres,
    crearTaller,
    actualizarTaller,
    eliminarTaller,
}