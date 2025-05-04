import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Ejercicios} from "../common/ejercicios";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Entrenamiento, ApiResponseEntrenamiento, ApiResponseEntrenamientos} from "../common/entrenamientos";

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

  getEntrenamientosPorFecha(fecha: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.urlBase}entrenamientos/fecha/${fecha}`);
  }

  guardarEntrenamiento(entrenamiento: Entrenamiento): Observable<ApiResponseEntrenamiento> {
    return this.httpClient.post<ApiResponseEntrenamiento>(`${environment.urlBase}entrenamientos`, entrenamiento);
  }
  
  getEntrenamientosPorAtleta(idAtleta: string): Observable<ApiResponseEntrenamientos> {
    return this.httpClient.get<ApiResponseEntrenamientos>(`${environment.urlBase}entrenamientos/atleta/${idAtleta}`);
  }

  getEntrenamientosPorAtletaAlternativo(idAtleta: string): Observable<ApiResponseEntrenamientos> {
    return this.httpClient.get<ApiResponseEntrenamientos>(`${environment.urlBase}entrenamientos?idAtleta=${idAtleta}`);
  }

  getAllEntrenamientos(): Observable<ApiResponseEntrenamientos> {
    return this.httpClient.get<ApiResponseEntrenamientos>(`${environment.urlBase}entrenamientos`);
  }

  getEntrenamiento(id: string): Observable<ApiResponseEntrenamiento> {
    return this.httpClient.get<ApiResponseEntrenamiento>(`${environment.urlBase}entrenamientos/${id}`);
  }

  actualizarEntrenamiento(id: string, entrenamiento: Entrenamiento): Observable<ApiResponseEntrenamiento> {
    return this.httpClient.put<ApiResponseEntrenamiento>(`${environment.urlBase}entrenamientos/${id}`, entrenamiento);
  }

  constructor() {
  }
}
