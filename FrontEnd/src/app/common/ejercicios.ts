export interface Ejercicios {
    _id: string
    name: string
    video: string
    description: string
    nullCauses: NullCause[]
  }
  
  export interface NullCause {
    reason: string
    image: string
  }