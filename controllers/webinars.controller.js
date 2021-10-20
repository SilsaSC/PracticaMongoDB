const { response } = require('express');
const Webinar = require('../models/webinar.model');
const Ponente = require('../models/ponente.model');


const getWebinars = async(req, res = response) => {

    const webinars = await Webinar.find()
        .populate('sala', 'nombre_sala url costo disponibilidad')
        .populate('ponente', 'nombre apellido dni email salario disponibilidad')

    res.json({
        ok: true,
        webinars
    })
}
const crearWebinar = async(req, res = response) => {

    //console.log(req.body);
    const { webinar_tema, fecha_inicio, fecha_fin, costo } = req.body;

    try {
        const existeTema = await Webinar.findOne({ webinar_tema }); //Linea para buscar los webinars
        if (existeTema) {
            return res.status(400).json({
                ok: false,
                msg: 'El Tema del webinar ya han sido registrado'
            });
        }
        //crear webinar
        const webinarnuevo = new Webinar(req.body);
        //buscar el ponente para asignarle el we
        const ponente = await Ponente.findById(req.params)
            //
        webinarnuevo.ponente = ponente
            //guardar el webianr para el ponente
        await webinarnuevo.save()
            //Asignar el webinar al ponente
        ponente.webinar.push(webinarnuevo)
            //Guadar el ponente con un webinar nuevo
        await ponente.save();


        const webinarDB = await webinarnuevo.save();
        res.json({
            ok: true,
            webinarnuevo: webinarDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar el webinar, consulte con el administrador'
        })
    }

}
const actualizarWebinar = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const webinar = await Webinar.findById(id);
        if (!webinar) {
            return res.status(404).json({
                ok: true,
                msg: 'Webinar no encontrado por id',
            });
        }
        const cambiosWebinar = {
            ...req.body,
            sala: uid
        }
        const webinaeActualisado = await Webinar.findByIdAndUpdate(id, cambiosWebinar, { new: true });
        res.json({
            ok: true,
            webinar: webinaeActualisado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el webinar, consulte con el administrador'
        })
    }
}

const eliminarWebinar = async(req, res = response) => {
    const id = req.params.id;
    try {

        const webinar = await Webinar.findById(id);

        if (!webinar) {
            return res.status(404).json({
                ok: true,
                msg: 'webinar no encontrado por id',
            });
        }

        await Webinar.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Webinar se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el Webinar, consulte con el administrador'
        })
    }
}
const asignarPonente = async(req, res = response) => {
    const id = req.params.id;
    const { ponente } = req.body;
    try {
        const webinar = await Webinar.findById(id);
        if (!webinar) {
            return res.status(404).json({
                ok: true,
                msg: 'Webinar no encontrado por id',
            });
        }
        const cambiosWebinar = {
            ponente: ponente
        }
        const webinaeActualisado = await Webinar.findByIdAndUpdate(id, cambiosWebinar, { new: true });
        res.json({
            ok: true,
            webinar: webinaeActualisado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el webinar, consulte con el administrador'
        })
    }
}


module.exports = {
    getWebinars,
    crearWebinar,
    actualizarWebinar,
    eliminarWebinar,
    asignarPonente,
}