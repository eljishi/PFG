export interface EjercicioDTO {
    name: string
    video: string
    description: string
    nullCauses: NullCauseDTO[]
}

export interface NullCauseDTO {
    reason: string
    image: string
}