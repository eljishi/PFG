import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  
  IonContent, 
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonAvatar,
  IonBadge,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { UsuariosService } from '../../services/usuarios.service';
import { addIcons } from 'ionicons';
import { clipboardOutline } from 'ionicons/icons';

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
    IonIcon,
    HeaderComponent
  ]
})
export class PerfilUsuarioPage implements OnInit {
  usuario = {
    nombre: '',
    email: '',
  
    entrenador: '',
    esEntrenador: false,
    id: '',
    idEntrenador: ''
  };

  constructor(
    private usuariosService: UsuariosService,
    private toastController: ToastController
  ) {
    addIcons({ clipboardOutline });
  }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    if (this.usuariosService.usuario) {
      this.usuario = {
        nombre: this.usuariosService.usuario.user || '',
        email: this.usuariosService.usuario.mail || '',
        entrenador: 'Por asignar',
        esEntrenador: this.usuariosService.usuario.esEntrenador || false,
        id: this.usuariosService.usuario._id || '',
        idEntrenador: this.usuariosService.usuario.idEntrenador || 'Sin asignar'
      };
    }
  }

  async copiarAlPortapapeles(texto: string) {
    if (!texto || texto === 'Sin asignar') {
      await this.mostrarToast('No hay ID para copiar');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(texto);
      await this.mostrarToast('ID copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar: ', err);
      await this.mostrarToast('Error al copiar el ID');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
