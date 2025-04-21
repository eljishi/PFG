import { Schema } from "mongoose";

export const EjerciciosSchema = new Schema({
    name: { type: String, required: true },
    video: { type: String, required: true },
    description: { type: String, required: true },
    nullCauses: [{
        reason: { type: String, required: true },
        image: { type: String, required: true }
    }]
}, { versionKey: false });