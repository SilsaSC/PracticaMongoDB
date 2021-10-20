const { Schema, model, SchemaTypes } = require('mongoose');

//Definicion del esquema para la coleccion de Facturas

const FacturaSchema = Schema({
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Locale',
        require: true
    },
    ponente: {
        type: Schema.Types.ObjectId,
        ref: 'Ponente',
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },

    webinar: {
        type: Schema.Types.ObjectId,
        ref: 'Webinar',
        require: true
    },
    certificado: {
        type: Schema.Types.ObjectId,
        ref: 'Certificado',
        require: true
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        require: true
    }

}, { collection: 'facturas' });
//se utiliza collection para indicar el nombre como queremos que se cree 
//la coleccion en la base de datos

//Este cambio es solo para fines visuales, la bd permanece con _id
FacturaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: Facturas
module.exports = model('Factura', FacturaSchema);