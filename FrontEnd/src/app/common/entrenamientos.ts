export interface Entrenamiento {
  id: number
  dia: string
  ejercicio: Ejercicio[]
}

export interface Ejercicio {
  id: number
  nombre: string
  series: Series[]
}

export interface Series {
  id: number
  kilos: number
  repeticiones: number
  rpe: number
}
