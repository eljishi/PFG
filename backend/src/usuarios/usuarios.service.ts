import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./interfaces/usuarios.interface/usuarios.interface.interface";
import {UsuarioDTO} from "./dto/usuarios.dto/usuarios.dto";

@Injectable()
export class UsuariosService {
    constructor(@InjectModel('Usuario')
    private usuarioModel: Model<Usuario>) {
    }

    async create(usuarioDto: UsuarioDTO): Promise<any>{
        const usuario = new this.usuarioModel(usuarioDto);
        return usuario.save()
    }

    async findOne(condition: any): Promise<any>{
        return this.usuarioModel.findOne(condition).exec();
    }

    async getUsuarios(): Promise<Usuario[]>{
        return this.usuarioModel.find();
    }


    async getUsuario(idUsuario: string): Promise<any>{
        return this.usuarioModel.findById(idUsuario);
    }

    async updateUsuario(
        idUsuario: string, usuarioDto: UsuarioDTO ): Promise<any>{
        return this.usuarioModel.findByIdAndUpdate(
            idUsuario,
            {$set: usuarioDto},
            {new: true}
        );
    }

    async deleteUsuario(idUsuario: string): Promise<any>{
        return this.usuarioModel.findByIdAndDelete(idUsuario);
    }


}
