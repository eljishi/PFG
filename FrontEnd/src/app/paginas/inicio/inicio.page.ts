import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class InicioPage implements OnInit {
  atletas: Array<{id: string, nombre: string}> = [];
  esEntrenador: boolean = false;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    await this.usuariosService.validaToken();
    
    if (this.usuariosService.usuario) {
      this.esEntrenador = this.usuariosService.usuario.esEntrenador;
      
      // Si es entrenador, cargar sus atletas
      if (this.esEntrenador && this.usuariosService.usuario._id) {
        try {
          this.atletas = await this.usuariosService.getAtletasByEntrenador(this.usuariosService.usuario._id);
        } catch (error) {
          console.error('Error al cargar atletas:', error);
        }
      }
    }
  }
}
