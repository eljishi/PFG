import {IsBoolean, IsString, Length, } from "class-validator";



export class UsuarioDTO {
    @IsString()
    id : number;
    @IsString()
    mail: string;
    @IsString()
    user: string;
    @IsString()
    @Length(6)
    password: string;
    @IsBoolean()
    esEntrenador: boolean;
}

