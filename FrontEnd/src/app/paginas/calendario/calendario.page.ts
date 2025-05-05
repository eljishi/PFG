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
                    if (Array.isArray(data)) {
            this.entrenamientosDelDia = data;
          } else if (data && data.data && Array.isArray(data.data)) {
            this.entrenamientosDelDia = data.data;
          } else {
            this.entrenamientosDelDia = [];
          }
          
          if (this.esEntrenador && this.atletasDelEntrenador.length > 0) {
            this.entrenamientosDelDia = this.entrenamientosDelDia.map(entrenamiento => {
              const atleta = this.atletasDelEntrenador.find(a => a._id === entrenamiento.idAtleta);              
              return {
                ...entrenamiento,
                nombreAtleta: atleta ? atleta.user : 'Atleta desconocido'
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