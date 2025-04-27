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
    IonBackButton,
    IonButtons,
  ]
})
export class AuthPage implements OnInit {
  pageType: string = 'register';
  pageTitle: string = 'Registro';
  
  userData = {
    email: '',
    name: '',
    password: '',
    coachId: ''  // Para el registro de atleta
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.pageType = params['type'];
        
        switch(this.pageType) {
          case 'register':
            this.pageTitle = 'Registro de Atleta';
            break;
          case 'athlete-login':
            this.pageTitle = 'Iniciar Sesión - Atleta';
            break;
          case 'coach-login':
            this.pageTitle = 'Iniciar Sesión - Entrenador';
            break;
          case 'coach-register':
            this.pageTitle = 'Registro - Entrenador';
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
    

    switch(this.pageType) {
      case 'register':
        // Registro de atleta: idEntrenador, correo, usuario, contraseña
        console.log('Procesando registro de atleta');
        break;
      case 'athlete-login':
        // Login atleta: correo, contraseña
        console.log('Procesando inicio de sesión de atleta');
        break;
      case 'coach-login':
        // Login entrenador: correo, contraseña
        console.log('Procesando inicio de sesión de entrenador');
        break;
      case 'coach-register':
        // Registro entrenador: correo, usuario, contraseña
        console.log('Procesando registro de entrenador');
        break;
    }
  }
}