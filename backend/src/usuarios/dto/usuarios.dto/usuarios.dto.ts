import {IsBoolean, IsString, Length, } from "class-validator";

export class UsuarioDTO {
    @IsString()
    idEntrenador : string;
    @IsString()
    mail: string;
    @IsString()
    user: string;
    @IsString()
    password: string;
    @IsBoolean()
    esEntrenador: boolean;
}

