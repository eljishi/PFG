import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAvatar,
  IonFooter
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
   IonContent, 
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAvatar,
    IonFooter,
    HeaderComponent
  ]
})
export class PerfilUsuarioPage implements OnInit {
  usuario = {
    nombre: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    foto: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    entrenador: 'Carlos Pérez'
  };

  constructor() {}

  ngOnInit() {
  }

  guardarCambios() {
    console.log('Guardando cambios del perfil', this.usuario);

  }
}
