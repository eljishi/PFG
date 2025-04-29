import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonBackButton,
  IonButtons,
  IonIcon,
  LoadingController,
  AlertController
} from '@ionic/angular/standalone';
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonBackButton,
    IonButtons,
    ReactiveFormsModule,
  ]
})
export class AuthPage implements OnInit {
  pageType: string = 'register';
  pageTitle: string = 'Registro';

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly userService: UsuariosService = inject(UsuariosService);
  private readonly router: Router = inject(Router);

  formUser: FormGroup = this.formBuilder.group({
    idEntrenador: [''],
    user: [''],
    mail: [''],
    password: [''],
    esEntrenador: ['']
  });

  loginUp =true;

  constructor() {
  }

// GETTERS
  get idEntrenador():any{
    return this.formUser.get('idEntrenador');
  }
  get name():any{
    return this.formUser.get('user');
  }
  get password():any{
    return this.formUser.get('password');
  }
  get mail():any{
    return this.formUser.get('mail');
  }
  get esEntrenador():any{
    return this.formUser.get('esEntrenador');
  }


  async login(){
    console.log('log')
    //if (this.formUser.invalid) return;

    const valido =
      await this.userService.login(this.mail.value, this.password.value);
    console.log(valido);

    if (valido){
      this.router.navigateByUrl('/user');
    }else {
      alert('Usuario y contraseña incorrectos');
    }
  }

  async register(){
    console.log('reg')

    if (this.formUser.invalid) return;
    const valido =
      await this.userService.registroAtleta(this.formUser.getRawValue());
    console.log(valido);
    if (valido){
      this.router.navigateByUrl('/user');
    }else {
      alert('El correo o el usuario ya existen');
    }
  }

  cleanForm(){
    this.formUser.reset();
  }

  async ngOnInit() {

  }
}
