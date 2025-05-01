import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./interfaces/usuarios.interface/usuarios.interface.interface";

import { CreateUsuarioDTO } from './dto/usuarios.dto/create-usuario.dto'; 

@Injectable()
export class UsuariosService {
    constructor(@InjectModel('Usuario')
    private usuarioModel: Model<Usuario>) {
    }

    async create(createUsuarioDto: CreateUsuarioDTO): Promise<Usuario>{ 
        const usuario = new this.usuarioModel(createUsuarioDto);
        return usuario.save(); 
    }

    async findOne(condition: any): Promise<any>{
        return this.usuarioModel.findOne(condition).exec();
    }

    async addAtletaToEntrenador(entrenadorId: string, atletaId: string, atletaNombre: string): Promise<Usuario> {
        const entrenador = await this.usuarioModel.findById(entrenadorId);
        
        if (!entrenador) {
            throw new Error('Entrenador no encontrado');
        }
        
        if (!entrenador.atletas) {
            entrenador.atletas = [];
        }
        

        const atletaExistente = entrenador.atletas.find(atleta => atleta.id === atletaId);
        
        if (!atletaExistente) {
            entrenador.atletas.push({ id: atletaId, nombre: atletaNombre });
            return entrenador.save();
        }
        
        return entrenador;
    }

    async getAtletasByEntrenador(entrenadorId: string): Promise<Array<{id: string, nombre: string}>> {
        const entrenador = await this.usuarioModel.findById(entrenadorId);
        
        if (!entrenador) {
            throw new Error('Entrenador no encontrado');
        }
        
        return entrenador.atletas || [];
    }
}
