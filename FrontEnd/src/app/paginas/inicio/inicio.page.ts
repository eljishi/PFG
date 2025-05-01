import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton]
})
export class InicioPage implements OnInit {
  atletas: Array<{id: string, nombre: string}> = [];
  esEntrenador: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

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

  agregarRutina(atleta: {id: string, nombre: string}) {
    console.log('Añadiendo rutina para:', atleta);
    // Aquí puedes implementar la navegación a la página de creación de rutinas
    // Por ejemplo:
    // this.router.navigate(['/crear-rutina'], { queryParams: { atletaId: atleta.id, atletaNombre: atleta.nombre } });
    
    // Por ahora, solo mostramos un mensaje en la consola
    alert(`Funcionalidad para añadir rutina a ${atleta.nombre} en desarrollo`);
  }
}
