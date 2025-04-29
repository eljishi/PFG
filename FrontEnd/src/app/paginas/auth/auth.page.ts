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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLabel,
    IonToggle,
    IonList,
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

  async register(){
    console.log('reg')

    if (this.formUser.invalid) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }
    
    this.isLoading = true;
    
    try {
      // Asegurarse de que idEntrenador sea una cadena de texto
      if (this.formUser.get('idEntrenador')?.value) {
        this.formUser.patchValue({ 
          idEntrenador: this.formUser.get('idEntrenador')?.value.toString() 
        });
      }
      
      // Determinar si es entrenador o atleta basado en pageType
      let valido;
      if (this.pageType === 'coach-register') {
        // Establecer esEntrenador a true para entrenadores
        this.formUser.patchValue({ esEntrenador: true });
        valido = await this.userService.registroEntrenador(this.formUser.getRawValue());
      } else {
        // Establecer esEntrenador a false para atletas
        this.formUser.patchValue({ esEntrenador: false });
        valido = await this.userService.registroAtleta(this.formUser.getRawValue());
      }
      
      console.log(valido);
      if (valido){
        this.router.navigateByUrl('/tabs');
      } else {
        alert('El correo o el usuario ya existen');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Error al intentar registrarse. Por favor, inténtalo de nuevo.');
    } finally {
      this.isLoading = false;
    }
}

  // Métodos de navegación
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
    // Obtener el tipo de página de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type) {
      this.pageType = type;
      
      // Configurar la página según el tipo
      if (type.includes('register')) {
        this.loginUp = false;
        this.pageTitle = type.includes('coach') ? 'Registro de Entrenador' : 'Registro de Atleta';
        
        // Añadir clase para estilos específicos
        document.body.classList.add(type.includes('coach') ? 'coach-mode' : 'athlete-mode');
      } else {
        this.loginUp = true;
        this.pageTitle = type.includes('coach') ? 'Iniciar Sesión como Entrenador' : 'Iniciar Sesión como Atleta';
        
        // Añadir clase para estilos específicos
        document.body.classList.add(type.includes('coach') ? 'coach-mode' : 'athlete-mode');
      }
    }
  }
}
