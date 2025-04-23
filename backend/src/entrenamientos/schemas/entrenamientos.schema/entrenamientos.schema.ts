import {Schema} from "mongoose";

export const EntrenamientosSchema = new Schema({
    name: {type: String, required: true},
    seriestotales: {type: Number, required: true},
    series: [{
        repeticiones: {type: Number, required: true},
        peso: {type: String, required: true}
    }],
    dia: {type: Date, required: true}
}, {versionKey: false});