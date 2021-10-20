const { Schema, model, SchemaTypes } = require('mongoose');
//Definicion del esquema para la coleccion de Talleres

const TallerSchema = Schema({
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    tema: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        require: true
    },
    ponente: {
        type: Schema.Types.ObjectId,
        ref: 'Ponente',
        require: true
    },
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Locale',
        require: true
    }
}, { collection: 'talleres' });
TallerSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Tallere', TallerSchema);