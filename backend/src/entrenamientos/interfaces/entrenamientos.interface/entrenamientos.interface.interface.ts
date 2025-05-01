import {EntrenamientosDTO} from "../../dto/entrenamientos.dto/entrenamientos.dto";

export interface Entrenamiento {
    id?: string;
    idAtleta: string;
    fecha: Date;
    nombre: string;
    ejercicios: Ejercicio[];
}

export interface Ejercicio {
    nombre: string;
    descripcion: string;
    series: Serie[];
}

export interface Serie {
    id?: string;
    kg: number;
    rpe: number;
    repeticiones: number;
}

export interface ApiResponseEntrenamiento {
    status: string;
    data: Entrenamiento;
}

export interface ApiResponseEntrenamientos {
    status: string;
    data: Entrenamiento[];
}

export interface ApiResponseMessage {
    status: string;
    message: string;
}

