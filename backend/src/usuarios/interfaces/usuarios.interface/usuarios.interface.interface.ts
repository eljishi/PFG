import {Document} from "mongoose";

export interface Usuario extends Document{
    id : number;
    mail: string;
    user: string;
    password: string;
    esEntrenador: boolean;
}


export interface ApiResponseUsuario{
    status: string;
    data: Usuario;
}
export interface ApiResponseUsuarios {
    status: string;
    data: Usuario[];
}

export interface ApiResponseMessage {
    status: string;
    message: string;
}

