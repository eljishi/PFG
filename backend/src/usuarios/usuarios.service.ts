import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./interfaces/usuarios.interface/usuarios.interface.interface";
// Cambia esta importación
// import {UsuarioDTO} from "./dto/usuarios.dto/usuarios.dto";
// Por esta:
import { CreateUsuarioDTO } from './dto/usuarios.dto/create-usuario.dto'; // Asegúrate que la ruta sea correcta

@Injectable()
export class UsuariosService {
    constructor(@InjectModel('Usuario')
    private usuarioModel: Model<Usuario>) {
    }

    // Cambia el tipo aquí de UsuarioDTO a CreateUsuarioDTO
    async create(createUsuarioDto: CreateUsuarioDTO): Promise<Usuario>{ // Devuelve tipo Usuario
        const usuario = new this.usuarioModel(createUsuarioDto);
        return usuario.save(); // .save() devolverá el documento completo con _id
    }

    async findOne(condition: any): Promise<any>{
        return this.usuarioModel.findOne(condition).exec();
    }

    // Método para añadir un atleta a un entrenador
    async addAtletaToEntrenador(entrenadorId: string, atletaId: string, atletaNombre: string): Promise<Usuario> {
        const entrenador = await this.usuarioModel.findById(entrenadorId);
        
        if (!entrenador) {
            throw new Error('Entrenador no encontrado');
        }
        
        if (!entrenador.atletas) {
            entrenador.atletas = [];
        }
        
        // Verificar si el atleta ya está en la lista
        const atletaExistente = entrenador.atletas.find(atleta => atleta.id === atletaId);
        
        if (!atletaExistente) {
            entrenador.atletas.push({ id: atletaId, nombre: atletaNombre });
            return entrenador.save();
        }
        
        return entrenador;
    }

    // Método para obtener todos los atletas de un entrenador
    async getAtletasByEntrenador(entrenadorId: string): Promise<Array<{id: string, nombre: string}>> {
        const entrenador = await this.usuarioModel.findById(entrenadorId);
        
        if (!entrenador) {
            throw new Error('Entrenador no encontrado');
        }
        
        return entrenador.atletas || [];
    }
}
