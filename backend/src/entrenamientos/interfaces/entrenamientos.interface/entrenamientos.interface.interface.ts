import {EntrenamientosDTO} from "../../dto/entrenamientos.dto/entrenamientos.dto";

export interface Entrenamiento {
    name: string
    seriestotales: number
    series: Series[]
    dia: Date
}

export interface Series {
    reason: string
    image: string
}

export interface ApiResponseEntrenamiento {
    status: string;
    data: Entrenamiento;
}

export interface ApiResponseEntrenamientos {
    status: string;
    data: Entrenamiento[];
}

export interface ApiResponseSeries {
    status: string;
    data: Series[];
}

export interface ApiResponseMessage {
    status: string;
    message: string;
}

