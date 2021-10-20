const { Schema, model, SchemaTypes } = require('mongoose');
//Definicion del esquema para la coleccion de Locales
const LocalSchema = Schema({
    nombre_local: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        //require: true
    },
    costo: {
        type: Number,
        require: true
    },
    disponibilidad: {
        type: Boolean,
        require: true
    },
}, { collection: 'locales' });
LocalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = model('Locale', LocalSchema)