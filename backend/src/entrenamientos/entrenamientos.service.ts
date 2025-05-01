import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Entrenamiento} from "./interfaces/entrenamientos.interface/entrenamientos.interface.interface";
import {EntrenamientosDTO} from "./dto/entrenamientos.dto/entrenamientos.dto";


@Injectable()
export class EntrenamientosService {
    constructor(@InjectModel('Entrenamiento')
    private entrenamientoModel: Model<Entrenamiento>) {
    }

    // Crea un nuevo entrenamiento
    async create(entrenamientosDTO: EntrenamientosDTO): Promise<any>{
        const entrenamiento = new this.entrenamientoModel(entrenamientosDTO);
        return entrenamiento.save()
    }

    // Obtiene todos los entrenamientos
    async getEjercicios(): Promise<Entrenamiento[]>{
        return this.entrenamientoModel.find();
    }

    // Obtiene un entrenamiento por ID
    async getEjercicio(idEntrenamiento: string): Promise<any>{
        return this.entrenamientoModel.findById(idEntrenamiento);
    }

    // Actualiza un entrenamiento
    async updateEjercicio(
        idEntrenamiento: string, entrenamientosDTO: EntrenamientosDTO ): Promise<any>{
        return this.entrenamientoModel.findByIdAndUpdate(
            idEntrenamiento,
            {$set: entrenamientosDTO},
            {new: true}
        );
    }

    // Elimina un entrenamiento
    async deleteEntrenamiento(idEntrenamiento: string): Promise<any>{
        return this.entrenamientoModel.findByIdAndDelete(idEntrenamiento);
    }

    // Obtiene entrenamientos por ID de atleta
    async getEntrenamientosByAtleta(idAtleta: string): Promise<Entrenamiento[]> {
        return this.entrenamientoModel.find({ idAtleta: idAtleta }).exec();
    }
}
