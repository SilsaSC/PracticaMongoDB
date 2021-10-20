const { request } = require("express");
const Ponente = require('../models/ponente.model');

const getPonentes = async(req, res) => {

    //const ponente = await Ponente.find();
    //para la paginacion: ponentes/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [ponentes, total] = await Promise.all([
        Ponente
        .find({}, 'nombre apellido dni email salario disponibilidad')
        .populate('webinar', 'webinar_tema')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Ponente.countDocuments()
    ]);
    res.json({
        ok: true,
        ponentes

    });
}

const crearPonente = async(req, res = response) => {

    //console.log(req.body);
    const { nombre, apellidos, dni, email, salario, disponibilidad } = req.body;

    try {

        const existeDNI = await Ponente.findOne({ dni }); //Linea para buscar los Ponentes
        const existeGmail = await Ponente.findOne({ email }); //Linea para buscar los Ponentes
        if (existeDNI) {
            return res.status(400).json({
                ok: false,
                msg: 'El DNI ya han sido registrado'
            });

        }
        if (existeGmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Gmail ya sido registrado'
            });

        }

        //creamos un objeto de la clase model Usuario
        const ponente = new Ponente(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await ponente.save();


        res.json({
            ok: true,
            ponente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}
const ActualizarPonente = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const ponente = await Ponente.findById(id);

        if (!ponente) {
            return res.status(404).json({
                ok: true,
                msg: 'Ponente no encontrado por id',
            });
        }

        const cambiosPonente = {
            ...req.body,
            sala: uid
        }

        const ponenteActualizado = await Ponente.findByIdAndUpdate(id, cambiosPonente, { new: true });


        res.json({
            ok: true,
            ponente: ponenteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el ponente, consulte con el administrador'
        })
    }

}

const EliminarPonente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const ponente = await Ponente.findById(id);

        if (!ponente) {
            return res.status(404).json({
                ok: true,
                msg: 'Ponente no encontrado por id',
            });
        }

        await Ponente.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Ponente se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el ponente, consulte con el administrador'
        })
    }
}


module.exports = {
    getPonentes,
    crearPonente,
    ActualizarPonente,
    EliminarPonente,
    //asignarWebinar,
}