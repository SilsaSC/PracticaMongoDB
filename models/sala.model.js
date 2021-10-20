const { Schema, model, SchemaTypes } = require('mongoose');
//Definicion del esquema para la coleccion de Ponentes
const SalaSchema = Schema({
    nombre_sala: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    costo: {
        type: Number,
        require: true
    },
    disponibilidad: {
        type: Boolean,
        require: true
    },
    webinar: [{
        type: Schema.Types.ObjectId,
        ref: 'Webinar',
        require: true
    }]
});
SalaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = model('Sala', SalaSchema);