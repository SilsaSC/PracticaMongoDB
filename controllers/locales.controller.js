const { request } = require("express");
const Local = require('../models/local.model');

const getLocales = async(req, res) => {

    //const ponente = await Ponente.find();
    //para la paginacion: ponentes/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [locales, total] = await Promise.all([
        Local
        .find({}, 'nombre_local direccion costo disponibilidad')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Local.countDocuments()
    ]);
    res.json({
        ok: true,
        locales
    });
}

const crearLocal = async(req, res = response) => {

    //console.log(req.body);
    const { nombre_local, direccion, costo, disponibilidad } = req.body;

    try {
        const existeNombre = await Local.findOne({ nombre_local }); //Linea para buscar los Locales
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre del local ya a sido registrado'
            });

        }

        //creamos un objeto de la clase model Usuario
        const local = new Local(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await local.save();


        res.json({
            ok: true,
            local
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarLocal = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const local = await Local.findById(id);

        if (!local) {
            return res.status(404).json({
                ok: true,
                msg: 'Local no encontrado por id',
            });
        }

        const cambiosLocal = {
            ...req.body,
            local: uid
        }

        const localActualizado = await Local.findByIdAndUpdate(id, cambiosLocal, { new: true });


        res.json({
            ok: true,
            local: localActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el local, consulte con el administrador'
        })
    }

}

const eliminarLocal = async(req, res = response) => {

    const id = req.params.id;

    try {

        const local = await Local.findById(id);

        if (!local) {
            return res.status(404).json({
                ok: true,
                msg: 'El local no encontrado por id',
            });
        }

        await Local.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Local borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Local no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getLocales,
    crearLocal,
    actualizarLocal,
    eliminarLocal,
}