import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Usuarios} from "../common/usuarios";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  token: string = '';
  usuario!: Usuarios;

  constructor() { }


  register(usuario: Usuarios): Promise<any> { 
    return new Promise((resolve, reject) => {
      this.httpClient.post(environment.urlBase + 'users/register', usuario)
        .subscribe({
          next: this.promesaGuardaToken(resolve), 
          error: (err) => {
            console.error('Error en registro:', err); 
            reject(err); 
          }
        });
    });
  }

  login(email: string, password: string){
    const data = {mail: email, password};
    return new Promise(resolve => {
      this.httpClient.post(environment.urlBase+'users/login',data)
        .subscribe({
          next: this.promesaGuardaToken(resolve),
          error: (err) => {
            console.error('Error en login:', err);
            resolve(false);
          }
        });
    });
  }

  private promesaGuardaToken(
    resolve: (value: (PromiseLike<unknown> | unknown)) => void) {
    return async (resp: any) => {
      if (resp.ok){
        await this.guardarToken(resp.token);
        resolve(true);
      }else {
        this.token = '';
        localStorage.clear();
        resolve(false);
      }
    };
  }

  private async guardarToken(token: string) {
    this.token = token;
    await localStorage.setItem('token',token);
    await this.validaToken();
  }


  public async validaToken():Promise<boolean> {
    await this.cargarToken();
    console.log(this.token)
    if(!this.token){
      this.router.navigateByUrl('/registro');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.httpClient.get(environment.urlBase+'users/user-info',
        {headers})
        .subscribe({
          next: (resp: any) => {
            if (resp.ok){
              console.log(resp)
              this.usuario = resp.usuario;
              resolve(true);
            } else {
              this.router.navigateByUrl('/registro');
              resolve(false);
            }
          },
          error: (err) => {
            console.error('Error validando token:', err);
            this.router.navigateByUrl('/registro');
            resolve(false);
          }
        });
    });
  }

  private async cargarToken() {
    this.token = await localStorage.getItem('token') || '';
  }

  async logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigateByUrl('/registro'); // Cambiado de '/login' a '/registro'
  }
}
