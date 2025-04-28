export interface Ejercicios {
    _id?: string;
    name: string;
    video: string;
    description: string;
    nullCauses: NullCause[];
}

export interface NullCause {
    reason: string;
    image: string;
}

export interface ApiResponseEjercicio {
    status: string;
    data: Ejercicios;
}

export interface ApiResponseEjercicios {
    status: string;
    data: Ejercicios[];
}
export interface ApiResponseNullCause {
  status: string;
  data: NullCause[];
}
export interface ApiResponseMessage {
  status: string;
  message: string;
}
  
  
  