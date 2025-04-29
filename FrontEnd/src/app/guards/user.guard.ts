import {CanMatchFn} from '@angular/router';
import {inject} from "@angular/core";
import {UsuariosService} from "../services/usuarios.service";


export const userGuard: CanMatchFn = (route, state) => {
  const usuariosService = inject(UsuariosService);
  return usuariosService.validaToken();
};
