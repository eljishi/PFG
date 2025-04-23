export interface EntrenamientosDTO {
    name: string
    seriestotales: number
    series: SeriesDTO[]
    dia: Date
}

export interface SeriesDTO {
    repeticiones: number
    peso: string
}