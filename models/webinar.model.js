const { Schema, model, SchemaTypes } = require('mongoose');

//Definicion del esquema para la coleccion de Webinars

const WebinarSchema = Schema({
    webinar_tema: {
        type: String,
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    sala: [{
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        require: true
    }],
    ponente: [{
        type: Schema.Types.ObjectId,
        ref: 'Ponente',
        require: true
    }]

}, { collection: 'webinars' });
//se utiliza collection para indicar el nombre como queremos que se cree 
//la coleccion en la base de datos

//Este cambio es solo para fines visuales, la bd permanece con _id
WebinarSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model('Webinar', WebinarSchema);