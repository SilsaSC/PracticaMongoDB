//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const Asistente = require('../models/asistente.model');
const Certificado = require('../models/certificado.model');

const Factura = require('../models/factura.model');
const Local = require('../models/local.model');
const Ponente = require('../models/ponente.model');
const Sala = require('../models/sala.model');
const Taller = require('../models/taller.model');
const Webinar = require('../models/webinar.model');


const busquedaTotal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    const [usuarios, asistentes, certificados, facturas, locales, ponentes, salas, talleres, webinars] = await Promise.all([
        Usuario.find({ nombre: miRegExp }), // la busqueda es por nombre
        Asistente.find({ nombre: miRegExp }),
        Certificado.find({ nombre: miRegExp }),
        Factura.find({ nombre: miRegExp }), // 
        Local.find({ nombre: miRegExp }),
        Ponente.find({ nombre: miRegExp }),
        Sala.find({ nombre: miRegExp }), // 
        Taller.find({ nombre: miRegExp }),
        Webinar.find({ nombre: miRegExp })
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios,
        asistentes,
        certificados,
        facturas,
        locales,
        ponentes,
        salas,
        talleres,
        webinars,
    });

}

//Buscar factura
const busquedaFactura = async(req, res = response) => {

        const idlocal = req.params.idlocal;
        const idponente = req.params.idponente;
        const iduasurio = req.params.iduasurio;
        const idwebinar = req.params.idwebinar;
        const idcertificado = req.params.idcertificado;
        const idsala = req.params.idsala;


        try {
            const existeFactura = await Factura.find({ idlocal, idponente, iduasurio, idwebinar, idcertificado, idsala });
            if (!existeFactura) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe factura que coincida con la busqueda"
                });
            }
            res.json({
                ok: true,
                factura: existeFactura
            })
        } catch (error) {

            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "No se encontro la factura, consulte con el administrador"
            });
        }
    }
    //Buscar Ponente
const busquedaTaller = async(req, res = response) => {

    const idlocal = req.params.idlocal;
    const idponente = req.params.idponente;
    const idsala = req.params.idsala;


    try {
        const existeTaller = await Factura.find({ idlocal, idponente, idsala });
        if (!existeTaller) {
            return res.status(404).json({
                ok: false,
                msg: "No existe Taller que coincida con la busqueda"
            });
        }
        res.json({
            ok: true,
            taller: existeTaller
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No se encontro el taller, consulte con el administrador"
        });
    }
}
module.exports = {
    busquedaTotal,
    busquedaFactura,
    busquedaTaller,
}