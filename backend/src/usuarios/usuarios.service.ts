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

}
