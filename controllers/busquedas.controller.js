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

module.exports = {
    busquedaTotal,
}