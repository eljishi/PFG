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

    async create(entrenamientosDTO: EntrenamientosDTO): Promise<any>{
        const entrenamiento = new this.entrenamientoModel(entrenamientosDTO);
        return entrenamiento.save()
    }

    async getEntrenamientos(): Promise<Entrenamiento[]>{
        return this.entrenamientoModel.find();
    }

    async getEntrenamiento(idEntrenamiento: string): Promise<any>{
        return this.entrenamientoModel.findById(idEntrenamiento);
    }

    async updateEntrenamiento(
        idEntrenamiento: string, entrenamientosDTO: EntrenamientosDTO ): Promise<any>{
        return this.entrenamientoModel.findByIdAndUpdate(
            idEntrenamiento,
            {$set: entrenamientosDTO},
            {new: true}
        );
    }

    async deleteEntrenamiento(idEntrenamiento: string): Promise<any>{
        return this.entrenamientoModel.findByIdAndDelete(idEntrenamiento);
    }

    async getEntrenamientosByAtleta(idAtleta: string): Promise<Entrenamiento[]> {
        return this.entrenamientoModel.find({ idAtleta: idAtleta }).exec();
    }
    
    async getEntrenamientosByFecha(fecha: string): Promise<Entrenamiento[]> {
        return this.entrenamientoModel.find({ fecha: fecha }).exec();
    }
}
