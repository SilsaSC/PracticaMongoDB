const { request } = require("express");
const Sala = require('../models/sala.model');
const Webinar = require('../models/webinar.model');

const getSalas = async(req, res) => {

    //const ponente = await Ponente.find();
    //para la paginacion: ponentes/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [salas, total] = await Promise.all([
        Sala
        .find({}, 'nombre_sala url disponibilidad')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Sala.countDocuments()
    ]);
    res.json({
        ok: true,
        salas
    });
}

const crearSala = async(req, res = response) => {

    //console.log(req.body);
    const { nombre_sala, costo, url, disponibilidad } = req.body;

    try {
        const existeURL = await Sala.findOne({ url }); //Linea para buscar los Ponentes
        if (existeURL) {
            return res.status(400).json({
                ok: false,
                msg: 'El URL a sido registrado'
            });

        }
        //creamos un objeto de la clase model Usuario
        const salanueva = new Sala(req.body);;
        //buscar el webinar para asignarle la sala
        const webinar = await Webinar.findById(req.params)
            //Asiognar la sala al ponete
        salanueva.webinar = webinar;
        //guardar el webianr para el ponente
        await salanueva.save()
            //Asignar la sala al webinar
        webinar.sala.push(salanueva)
            //Guadar el ponente con un webinar nuevo
        await webinar.save();


        res.json({
            ok: true,
            sala
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarSala = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const salaDB = await Sala.findById(uid);
        if (!salaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        //Codigo previo a la actualizacion
        const { nombre_sala, url, costo, disponibilidad, ...campos } = req.body;
        if (salaDB.url !== url) {
            const existeUrl = await Sala.findOne({ url });
            if (existeUrl) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una sala con esta url'
                });
            }
        }
        campos.url = url;
        //actualizacion de datos
        const salaActualizado = await Sala.findByIdAndUpdate(uid,
            campos, { new: true });
        res.json({
            ok: true,
            sala: salaActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const eliminarSala = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const salaDB = await Sala.findById(uid);
        if (!salaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una sala con ese id'
            });
        }
        await Sala.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Sala eliminada de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar sala'
        });
    }
}

module.exports = {
    getSalas,
    crearSala,
    actualizarSala,
    eliminarSala,
}