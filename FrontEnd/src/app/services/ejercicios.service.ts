import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ejercicios} from "../common/ejercicios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private readonly httpClient: HttpClient = inject(HttpClient)

  getEjercicios(): Observable<Ejercicios[]> {
    return this.httpClient.get<Ejercicios[]>(`${environment.urlBase}ejercicios/ejercicios`);
  }

  getEjercicio(id: string): Observable<Ejercicios> {
    return this.httpClient.get<Ejercicios>(`${environment.urlBase}ejercicio/${id}`);
  }

  constructor() { }
}
