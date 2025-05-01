import {Schema} from "mongoose";

export const EntrenamientosSchema = new Schema({
    idAtleta: {type: String, required: true},
    fecha: {type: Date, required: true},
    nombre: {type: String, required: true},
    ejercicios: [{
        nombre: {type: String, required: true},
        descripcion: {type: String, required: true},
        series: [{
            id: {type: String},
            kg: {type: Number, required: true},
            rpe: {type: Number, required: true},
            repeticiones: {type: Number, required: true}
        }]
    }]
}, {versionKey: false});