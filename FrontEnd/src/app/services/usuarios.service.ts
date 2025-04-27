import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private readonly httpClient: HttpClient = inject(HttpClient)


  constructor() { }
}
