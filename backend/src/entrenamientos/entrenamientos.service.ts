import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Entrenamiento} from "./interfaces/entrenamientos.interface/entrenamientos.interface.interface";
import {EntrenamientosDTO} from "./dto/entrenamientos.dto/entrenamientos.dto";


@Injectable()
export class EntrenamientosService {
    constructor(@InjectModel('Ejercicio')
    private entrenamientoModel: Model<Entrenamiento>) {
    }

    // inserta una serie
    async create(entrenamientosDTO: EntrenamientosDTO): Promise<any>{
        const entrenamiento = new this.entrenamientoModel(entrenamientosDTO);
        return entrenamiento.save()
    }


    async getEjercicios(): Promise<Entrenamiento[]>{
        return this.entrenamientoModel.find();
    }

    //pilla un ejercicio
    async getEjercicio(idEntrenamiento: string): Promise<any>{
        return this.entrenamientoModel.findById(idEntrenamiento);
    }


    //actualiza una serie
    async updateEjercicio(
        idEntrenamiento: string, entrenamientosDTO: EntrenamientosDTO ): Promise<any>{
        return this.entrenamientoModel.findByIdAndUpdate(
            idEntrenamiento,
            {$set: entrenamientosDTO},
            {new: true}
        );
    }

    //delete
    async deleteEntrenamiento(idEntrenamiento: string): Promise<any>{
        return this.entrenamientoModel.findByIdAndDelete(idEntrenamiento);
    }

    //get por un algo por si acaso
    /*
    async get?(): Promise<string[]>{
        return this.serieModel.find().distinct('categorias')
    }


    async getSerieByTitleOrSynopsis(searchTerm: string): Promise<any[]> {
        return this.serieModel.find({
            $or: [
                { titulo: { $regex: searchTerm, $options: 'i' } },
                { sinopsis: { $regex: searchTerm, $options: 'i' } }
            ]
        }).exec();
    }

    async getSeriesByCategory(categoria: string): Promise<Serie[]> {
        return this.serieModel.find({ 'categorias.categoria': categoria }).exec();
    }
    */
}
