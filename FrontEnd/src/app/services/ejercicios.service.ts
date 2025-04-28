import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {Ejercicios, ApiResponseEjercicios, ApiResponseEjercicio} from "../common/ejercicios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private readonly httpClient: HttpClient = inject(HttpClient)

  getEjercicios(): Observable<Ejercicios[]> {
    return this.httpClient.get<ApiResponseEjercicios>(`${environment.urlBase}ejercicios`)
      .pipe(
        map(response => response.data)
      );
  }

  getEjercicio(id: string): Observable<Ejercicios> {
    return this.httpClient.get<ApiResponseEjercicio>(`${environment.urlBase}ejercicios/ejercicio/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  constructor() { }
}
