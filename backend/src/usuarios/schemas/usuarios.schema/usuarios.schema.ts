import { Schema } from "mongoose";
import * as uniqueValidator from 'mongoose-unique-validator';

export const UsuariosSchema = new Schema({

    idEntrenador: {type: String},
    mail: { type: String, required: true , unique: true },
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    esEntrenador: {type: Boolean, required: true},
    atletas: {
        type: [{
            id: { type: String },
            nombre: { type: String }
        }],
        default: []
    }
}, {versionKey: false});
    UsuariosSchema.plugin(uniqueValidator,
        {status:'Error', message: 'Already in use'})
