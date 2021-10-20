const { Schema, model } = require('mongoose');
//Definicion del esquema para la coleccion de Certificados
const CertificadoSchema = Schema({
    nombre_certificado: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    costo: {
        type: Number,
        require: true
    },
    asistente: [{
        type: Schema.Types.ObjectId,
        ref: 'Asistente',
    }]
}, { collection: 'certificados' });
CertificadoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = model('Certificado', CertificadoSchema);