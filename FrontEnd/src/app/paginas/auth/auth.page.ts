import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonToggle,
  IonList,
  IonSpinner
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
    console.log('Iniciando login');
    if (this.formUser.invalid) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    this.isLoading = true;
    
    try {
      const valido = await this.userService.login(this.mail.value, this.password.value);
      console.log('Resultado login:', valido);

      this.isLoading = false;
      
      if (valido){
        this.router.navigateByUrl('/tabs');
      } else {
        alert('Usuario y contraseña incorrectos');
      }
    } catch (error) {
      this.isLoading = false;
      console.error('Error durante el login:', error);
      alert('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  }

  async register() {
    console.log('Iniciando registro con pageType:', this.pageType);

    this.formUser.markAllAsTouched();
    if (this.formUser.invalid) {
      if (this.pageType === 'register' && this.formUser.get('idEntrenador')?.hasError('required')) {
        alert('Por favor, ingresa el ID de tu entrenador.');
        return;
      }
      alert('Por favor, completa todos los campos requeridos correctamente.');
      return;
    }

    this.isLoading = true;

    try {
      let esEntrenadorFlag = false;
      if (this.pageType === 'coach-register') {
        esEntrenadorFlag = true;
      }

      const userData = { ...this.formUser.getRawValue(), esEntrenador: esEntrenadorFlag };

      if (esEntrenadorFlag || !userData.idEntrenador) {
         delete userData.idEntrenador;
      }

      console.log('Datos a enviar para registro:', userData);

      const valido = await this.userService.register(userData);

      console.log('Resultado registro:', valido);
      if (valido) {
        this.router.navigateByUrl('/tabs');
      } else {
        alert('El correo o el usuario ya existen, o hubo un error en el registro.');
      }
    } catch (error: any) {
      console.error('Error durante el registro:', error);

      let errorMessage = 'Error al intentar registrarse. Por favor, inténtalo de nuevo.';
      if (error && error.error && error.error.message) {
         errorMessage = `Error: ${error.error.message}`;
      } else if (error instanceof Error) {
         errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);

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

    } else { // Login
      this.loginUp = true;
      this.pageTitle = 'Iniciar Sesión';
      this.formUser.get('user')?.clearValidators();
      this.formUser.get('idEntrenador')?.clearValidators();
    }

    this.formUser.get('user')?.updateValueAndValidity();
    this.formUser.get('idEntrenador')?.updateValueAndValidity();
  }
}
