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

  registroEntrenador(usuario: Usuarios): Promise<any> {
    return new Promise( resolve => {
      this.httpClient.post(environment.urlBase+'register',usuario)
        .subscribe(this.promesaGuardaToken(resolve));
    })
      .catch(err => {
        console.error(err);
      })
  }

  registroAtleta(usuario: Usuarios): Promise<any> {
    return new Promise( resolve => {
      this.httpClient.post(environment.urlBase+'register',usuario)
        .subscribe(this.promesaGuardaToken(resolve));
    })
      .catch(err => {
        console.error(err);
      })
  }

  login(email: string, password: string){
    const data ={email, password};
    return new Promise(resolve => {
      this.httpClient.post(environment.urlBase+'login',data)
        .subscribe(this.promesaGuardaToken(resolve));
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
      this.httpClient.get(environment.urlBase+'user-info',
        {headers})
        .subscribe( (resp: any) => {
          if (resp.ok){
            console.log(resp)
            this.usuario = resp.usuario;
            resolve(true);
          }else {
            this.router.navigateByUrl('/login');
            resolve(false);
          }
        })
    })
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
