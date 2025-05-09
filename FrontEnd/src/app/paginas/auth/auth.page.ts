import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router} from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule,

    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonBackButton,
    IonButtons,
    ReactiveFormsModule,
    IonLabel,
    IonSpinner
  ]
})
export class AuthPage implements OnInit {
  pageType: string = 'register';
  pageTitle: string = 'Registro';
  isLoading: boolean = false;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly userService: UsuariosService = inject(UsuariosService);
  private readonly router: Router = inject(Router);
  private readonly toastController: ToastController = inject(ToastController);

  formUser: FormGroup = this.formBuilder.group({
    idEntrenador: [''], 
    user: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    esEntrenador: [false]
  });

  loginUp =true;

  constructor() {
  }

  async mostrarToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

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
    if (this.formUser.invalid) {
      this.mostrarToast('Rellena los campos');
      return;
    }

    this.isLoading = true;
    
    try {
      const valido = await this.userService.login(this.mail.value, this.password.value);
      this.isLoading = false;
      
      if (valido){
        this.router.navigateByUrl('/tabs');
      } else {
        this.mostrarToast('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      this.isLoading = false;
    }
  }

  async register() {
    this.formUser.markAllAsTouched();
    if (this.formUser.invalid) {
      if (this.pageType === 'register' && this.formUser.get('idEntrenador')?.hasError('required')) {
        this.mostrarToast('Id de entrenador no valido.');
        return;
      }
      this.mostrarToast('Completa todos los campos.');
      return;
    }

    this.isLoading = true;

    try {
      let esEntrenadorFlag = false;
      if (this.pageType === 'coach-register') {
        esEntrenadorFlag = true;
      }
      
      const userData = { ...this.formUser.getRawValue(), esEntrenador: esEntrenadorFlag };
      
      if (esEntrenadorFlag || !userData.idEntrenador || userData.idEntrenador.trim() === '') {
        delete userData.idEntrenador;
      }
      
      console.log('Datos de registro:', userData);
      
      const valido = await this.userService.register(userData);
      if (valido) {
        this.mostrarToast('Registro exitoso', 'success');
        this.router.navigateByUrl('/tabs');
      } else {
        this.mostrarToast('Correo ya registrado o no válido.');
      }
    } catch (error: any) {
      this.mostrarToast('Error al registrar usuario. Inténtalo de nuevo.');
    } finally {
      this.isLoading = false;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/auth'], { queryParams: { type: 'register' } });
  }

  navigateToCoachRegister() {
    this.router.navigate(['/auth'], { queryParams: { type: 'coach-register' } });
  }

  navigateToLogin() {
    this.router.navigate(['/auth'], { queryParams: { type: 'login' } });
  }

  cleanForm(){
    this.formUser.reset();
  }

  async ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'login'; 
    this.pageType = type;

    document.body.classList.remove('coach-mode', 'athlete-mode');

    if (type.includes('register')) {
      this.loginUp = false;
      this.pageTitle = type === 'coach-register' ? 'Registro de Entrenador' : 'Registro de Atleta';
      document.body.classList.add(type === 'coach-register' ? 'coach-mode' : 'athlete-mode');

      this.formUser.get('user')?.setValidators(Validators.required);
      if (type === 'register') { 
        this.formUser.get('idEntrenador')?.setValidators(Validators.required);
      } else { 
        this.formUser.get('idEntrenador')?.clearValidators();
      }

    } else { 
      this.loginUp = true;
      this.pageTitle = 'Iniciar Sesión';
      this.formUser.get('user')?.clearValidators();
      this.formUser.get('idEntrenador')?.clearValidators();
    }

    this.formUser.get('user')?.updateValueAndValidity();
    this.formUser.get('idEntrenador')?.updateValueAndValidity();
  }
}
