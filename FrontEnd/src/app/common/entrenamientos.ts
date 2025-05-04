export interface Entrenamiento {
  id?: string;
  _id?: string;  // Add this line to support both formats
  nombre: string;
  fecha: Date;
  ejercicios: any[];
  idAtleta?: string; // Add this property to support the idAtleta field
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
