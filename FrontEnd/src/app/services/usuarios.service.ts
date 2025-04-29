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

  // Elimina los métodos registroEntrenador y registroAtleta

  register(usuario: Usuarios): Promise<any> { // Nuevo método unificado
    return new Promise((resolve, reject) => {
      this.httpClient.post(environment.urlBase + 'users/register', usuario)
        .subscribe({
          next: this.promesaGuardaToken(resolve), // Reutiliza el manejador de token existente
          error: (err) => {
            console.error('Error en registro:', err); // Log específico para registro
            reject(err); // Rechaza la promesa en caso de error HTTP
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


  //TOKEN
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
      this.router.navigateByUrl('/login');
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
              this.router.navigateByUrl('/login');
              resolve(false);
            }
          },
          error: (err) => {
            console.error('Error validando token:', err);
            this.router.navigateByUrl('/login');
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
    this.router.navigateByUrl('/login');
  }
}
