export class EjercicioDTO {
    name: string
    video: string
    description: string
    nullCauses: NullCauseDTO[]
}

export class NullCauseDTO {
    reason: string
    image: string
}