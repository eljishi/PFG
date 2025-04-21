import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonBackButton,
  IonButtons,
  IonIcon
} from '@ionic/angular/standalone';

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
    IonLabel,
    IonList,
    IonBackButton,
    IonButtons,
    IonIcon
  ]
})
export class AuthPage implements OnInit {
  pageType: string = 'register'; // 'register', 'athlete-login', 'coach-login'
  pageTitle: string = 'Registro';
  
  userData = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Determinar el tipo de página basado en el parámetro de ruta
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.pageType = params['type'];
        
        switch(this.pageType) {
          case 'register':
            this.pageTitle = 'Registro';
            break;
          case 'athlete-login':
            this.pageTitle = 'Iniciar Sesión - Atleta';
            break;
          case 'coach-login':
            this.pageTitle = 'Iniciar Sesión - Entrenador';
            break;
          default:
            this.pageTitle = 'Registro';
            this.pageType = 'register';
        }
      }
    });
  }

  submitForm() {
    console.log('Formulario enviado:', this.userData);
    console.log('Tipo de página:', this.pageType);
    
    // Aquí implementarías la lógica específica para cada tipo de formulario
    switch(this.pageType) {
      case 'register':
        // Lógica de registro
        console.log('Procesando registro');
        break;
      case 'athlete-login':
        // Lógica de inicio de sesión para atletas
        console.log('Procesando inicio de sesión de atleta');
        break;
      case 'coach-login':
        // Lógica de inicio de sesión para entrenadores
        console.log('Procesando inicio de sesión de entrenador');
        break;
    }
    
    // Redirigir a la página principal después del éxito
    // this.router.navigate(['/home']);
  }
}