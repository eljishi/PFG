import { Schema } from "mongoose";

export const UsuariosSchema = new Schema({
    id: {type: Number},
    mail: { type: String, required: true },
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    esEntrenador: {type: String, required: true}
}, { versionKey: false });