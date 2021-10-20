const { request } = require("express");
const Certificado = require('../models/certificado.model');

const getCertificados = async(req, res) => {

    //para la paginacion: certificados/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [certificados, total] = await Promise.all([
        Certificado
        .find({}, 'nombre_certificado descripcion costo')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Certificado.countDocuments()
    ]);
    res.json({
        ok: true,
        certificados
    });
}

const crearCertificado = async(req, res = response) => {

    //console.log(req.body);
    const { nombre_certificado, descripcion, costo } = req.body;

    try {
        const existeNombre_certificado = await Certificado.findOne({ nombre_certificado }); //Linea para buscar los Certificado
        if (existeNombre_certificado) {
            return res.status(400).json({
                ok: false,
                msg: 'El certificado ya a sido registrado'
            });

        }

        //creamos un objeto de la clase model Certificado
        const certificado = new Certificado(req.body);

        //indicamos a mongoose que registre al certificado en la bd
        await certificado.save();
        res.json({
            ok: true,
            certificado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}
const actualizarCertificados = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const certificado = await Certificado.findById(id);

        if (!certificado) {
            return res.status(404).json({
                ok: true,
                msg: 'Certificado no encontrado por id',
            });
        }

        const cambiosCertificado = {
            ...req.body,
            Certificado: uid
        }

        const certificadoActualizado = await Certificado.findByIdAndUpdate(id, cambiosCertificado, { new: true });


        res.json({
            ok: true,
            certificado: certificadoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el certificado, consulte con el administrador'
        })
    }

}

const eliminarCertificado = async(req, res = response) => {

    const id = req.params.id;

    try {

        const certificado = await Local.findById(id);

        if (!certificado) {
            return res.status(404).json({
                ok: true,
                msg: 'El certificado no encontrado por id',
            });
        }

        await Certificado.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Certificado borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'El certificado no puede eliminarse, consulte con el administrador'
        })
    }

}
module.exports = {
    getCertificados,
    crearCertificado,
    actualizarCertificados,
    eliminarCertificado,
}