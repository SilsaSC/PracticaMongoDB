const { Schema, model, SchemaTypes } = require('mongoose');
//Definicion del esquema para la coleccion de Ponentes
const PonenteSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    apellidos: {
        type: String,
        require: true
    },
    dni: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    salario: {
        type: Number,
        require: true
    },
    disponibilidad: {
        type: Boolean,
        require: true
    },
    fecha_Nacimiento: {
        type: Date,
    },
    webinar: [{
        type: Schema.Types.ObjectId,
        ref: 'Webinar',
        require: true,

    }]
}, { collection: 'ponentes' });
PonenteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = model('Ponente', PonenteSchema);