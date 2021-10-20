const { Schema, model, SchemaTypes } = require('mongoose');
//Definicion del esquema para la coleccion de Talleres

const AsistenteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    dni: {
        type: Number,
        required: true
    },
    universidad: {
        type: String,
    },
    celular: {
        type: Number,
        required: true
    },
    taller: {
        type: Schema.Types.ObjectId,
        ref: 'Webinar',
    },
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Locale',
    },
    ponente: [{
        type: Schema.Types.ObjectId,
        ref: 'Ponente',
        require: true
    }],
    webinar: [{
        type: Schema.Types.ObjectId,
        ref: 'Webinar',
    }],
    certificado: [{
        type: Schema.Types.ObjectId,
        ref: 'Certificado',
    }],
    sala: [{
        type: Schema.Types.ObjectId,
        ref: 'Sala',
    }]
}, { collection: 'asistentes' });
//se utiliza collection para indicar el nombre como queremos que se cree 
//la coleccion en la base de datos

//Este cambio es solo para fines visuales, la bd permanece con _id
AsistenteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: Asistente
module.exports = model('Asistente', AsistenteSchema);