import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Ejercicios} from "../common/ejercicios";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Entrenamiento, ApiResponseEntrenamiento} from "../common/entrenamientos";

@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {
  private readonly httpClient: HttpClient = inject(HttpClient)

  getEjercicios(): Observable<Ejercicios[]> {
    return this.httpClient.get<Ejercicios[]>(`${environment.urlBase}entrenamientos`);
  }

  getEjercicio(id: string): Observable<Ejercicios> {
    return this.httpClient.get<Ejercicios>(`${environment.urlBase}entrenamiento/${id}`);
  }

  // Nuevo método para obtener entrenamientos por fecha
  getEntrenamientosPorFecha(fecha: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.urlBase}entrenamientos/fecha/${fecha}`);
  }

  // Nuevo método para guardar un entrenamiento
  guardarEntrenamiento(entrenamiento: Entrenamiento): Observable<ApiResponseEntrenamiento> {
    return this.httpClient.post<ApiResponseEntrenamiento>(`${environment.urlBase}entrenamientos`, entrenamiento);
  }

  constructor() {
  }
}
