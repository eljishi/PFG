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
        return this.ejercicioModel.find().exec();
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
}
