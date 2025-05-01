export interface EntrenamientosDTO {
    idAtleta: string;
    fecha: Date;
    nombre: string;
    ejercicios: EjercicioDTO[];
}

export interface EjercicioDTO {
    nombre: string;
    descripcion: string;
    series: SerieDTO[];
}

export interface SerieDTO {
    id?: string;
    kg: number;
    rpe: number;
    repeticiones: number;
}