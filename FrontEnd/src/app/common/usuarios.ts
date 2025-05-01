export interface Usuarios {
    _id? : string;
    idEntrenador?: string;
    mail: string;
    user: string;
    password: string;
    esEntrenador: boolean;
    atletas?: Array<{id: string, nombre: string}>;
}
