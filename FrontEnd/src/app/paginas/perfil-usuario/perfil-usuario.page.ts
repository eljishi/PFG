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
  IonFooter,
  IonBadge
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { UsuariosService } from '../../services/usuarios.service';

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
    IonAvatar,
    IonBadge,
    HeaderComponent
  ]
})
export class PerfilUsuarioPage implements OnInit {
  usuario = {
    nombre: '',
    email: '',
    foto: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    entrenador: '',
    esEntrenador: false
  };

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    if (this.usuariosService.usuario) {
      this.usuario = {
        nombre: this.usuariosService.usuario.user || '',
        email: this.usuariosService.usuario.mail || '',
        foto: 'https://ionicframework.com/docs/img/demos/avatar.svg', 
        entrenador: 'Por asignar',
        esEntrenador: this.usuariosService.usuario.esEntrenador || false
      };
    }
  }

}
