export interface Usuario {
    id : number
    mail: string
    user: string
    password: string
    esEntrenador: string
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

