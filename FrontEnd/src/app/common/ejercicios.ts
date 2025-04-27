export interface Ejercicios {
    name: string
    video: string
    description: string
    nullCauses: NullCause[]
  }
  
  export interface NullCause {
    reason: string
    image: string
  }