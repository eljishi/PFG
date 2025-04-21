import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Ejercicio} from "./interfaces/ejercicios.interface/ejercicios.interface.interface";
import {EjercicioDTO} from "./dto/ejercicios.dto/ejercicios.dto";

@Injectable()
export class EjerciciosService {
    constructor(@InjectModel('Ejercicio')
    private ejercicioModel: Model<Ejercicio>) {
    }

    // inserta una serie
    async create(ejercicioDto: EjercicioDTO): Promise<any>{
        const ejercicio = new this.ejercicioModel(ejercicioDto);
        return ejercicio.save()
    }


    async getEjercicios(): Promise<Ejercicio[]>{
        return this.ejercicioModel.find();
    }

    //pilla un ejercicio
    async getEjercicio(idEjercicio: string): Promise<any>{
        return this.ejercicioModel.findById(idEjercicio);
    }


    //actualiza una serie
    async updateEjercicio(
        idEjercicio: string, ejercicioDto: EjercicioDTO ): Promise<any>{
        return this.ejercicioModel.findByIdAndUpdate(
            idEjercicio,
            {$set: ejercicioDto},
            {new: true}
        );
    }

    //delete
    async deleteEjercicio(idEjercicio: string): Promise<any>{
        return this.ejercicioModel.findByIdAndDelete(idEjercicio);
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
