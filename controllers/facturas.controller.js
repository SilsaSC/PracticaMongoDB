const { response } = require('express');
const Factura = require('../models/factura.model');
const getFactura = async(req, res = response) => {

    const facturas = await Factura.find()
        .populate('local', 'nombre_local direccion costo')
        .populate('ponente', 'nombre apellidos dni salario')
        .populate('usuario', 'nombre')
        .populate('webinar', 'webinar_tema costo')
        .populate('certificado', 'nombre_certificado costo')
        .populate('sala', 'nombre_sala costo')
    res.json({
        ok: true,
        facturas: facturas
    })
}
const crearFactura = async(req, res = response) => {

    const uid = req.uid;
    const factura = new Factura({
        factura: uid,
        ...req.body
    });
    try {
        const facturaDB = await factura.save();
        res.json({
            ok: true,
            factura: facturaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear la factura, consulte con el administrador'
        })
    }

}

const actualizarFactura = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const factura = await Factura.findById(id);

        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'Factura no encontrada por id',
            });
        }

        const cambiosFactura = {
            ...req.body,
            factura: uid
        }

        const facturaActualizada = await Factura.findByIdAndUpdate(id, cambiosFactura, { new: true });


        res.json({
            ok: true,
            factura: facturaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la factura, consulte con el administrador'
        })
    }

}

const eliminarFactura = async(req, res = response) => {

    const id = req.params.id;

    try {

        const factura = await Factura.findById(id);

        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'la factura no encontrada por id',
            });
        }

        await Factura.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Factura borrada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Factura no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura,
}