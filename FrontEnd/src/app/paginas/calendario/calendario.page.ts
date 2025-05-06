import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonDatetime, 
  IonButton,
  IonCardSubtitle 
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HeaderComponent, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,  
    IonDatetime,
    IonButton,
    IonCardSubtitle
  ]
})
export class CalendarioPage implements OnInit {
  fechaSeleccionada: string = '';
  entrenamientosDelDia: any[] = [];
  cargando: boolean = false;
  userId: string = '';
  esEntrenador: boolean = false;
  atletasDelEntrenador: any[] = [];

  constructor(
    private entrenamientosService: EntrenamientosService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    if (this.usuariosService.usuario && this.usuariosService.usuario._id) {
      this.userId = this.usuariosService.usuario._id;

      this.esEntrenador = this.usuariosService.usuario.esEntrenador === true 
      
      if (this.esEntrenador) {
        this.obtenerAtletasDelEntrenador();
      }
    } else {
      console.error('No hay usuario autenticado o falta el ID');
    }
  }

  obtenerAtletasDelEntrenador() {
    this.usuariosService.getAtletasByEntrenador(this.userId)
      .then((atletas) => {
        this.atletasDelEntrenador = atletas;

        if (this.fechaSeleccionada) {
          this.cargarEntrenamientosDelDia();
        }
      })
      .catch((error) => {
        this.atletasDelEntrenador = [];
      });
  }

  onFechaSeleccionada(event: any) {
    this.fechaSeleccionada = event.detail.value.split('T')[0];
        this.cargarEntrenamientosDelDia();
  }

  cargarEntrenamientosDelDia() {
    if (!this.fechaSeleccionada || !this.userId) {
      this.entrenamientosDelDia = [];
      return;
    }

    this.cargando = true;
    
    this.entrenamientosService.getEntrenamientosPorFecha(this.fechaSeleccionada)
      .subscribe({
        next: (data: any) => {
          let entrenamientos = [];
          if (Array.isArray(data)) {
            entrenamientos = data;
          } else if (data && data.data && Array.isArray(data.data)) {
            entrenamientos = data.data;
          } else {
            entrenamientos = [];
          }
          
          // Filtrar entrenamientos según el rol del usuario
          if (this.esEntrenador) {
            // Si es entrenador, mostrar solo entrenamientos de sus atletas
            if (this.atletasDelEntrenador && this.atletasDelEntrenador.length > 0) {
              const idsAtletas = this.atletasDelEntrenador.map(atleta => atleta.id);
              entrenamientos = entrenamientos.filter((entrenamiento: { idAtleta: string }) =>
                idsAtletas.includes(entrenamiento.idAtleta)
              );
            }
          } else {
            // Si es atleta, mostrar solo sus propios entrenamientos
            entrenamientos = entrenamientos.filter((entrenamiento: { idAtleta: string }) =>
              entrenamiento.idAtleta === this.userId
            );
          }
          
          this.entrenamientosDelDia = entrenamientos;
          
          // Añadir nombre de atleta para entrenadores
          if (this.esEntrenador && this.atletasDelEntrenador.length > 0) {
            this.entrenamientosDelDia = this.entrenamientosDelDia.map(entrenamiento => {
              const atleta = this.atletasDelEntrenador.find(a => a.id === entrenamiento.idAtleta);              
              return {
                ...entrenamiento,
                nombreAtleta: atleta ? atleta.nombre : 'Atleta desconocido'
              };
            });
          }
          
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar entrenamientos:', error);
          this.entrenamientosDelDia = [];
          this.cargando = false;
        }
      });
  }

  verDetalleEntrenamiento(entrenamiento: any) {
    this.router.navigate(['/ejercicios'], {
      queryParams: {
        entrenamientoId: entrenamiento._id || entrenamiento.id
      }
    });
  }
}