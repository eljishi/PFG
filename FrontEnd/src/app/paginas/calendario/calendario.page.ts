import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonDatetime, IonButton } from '@ionic/angular/standalone';
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
    IonList, 
    IonItem, 
    IonLabel,
    IonDatetime,
    IonButton
  ]
})
export class CalendarioPage implements OnInit {
  fechaSeleccionada: string = '';
  entrenamientosDelDia: any[] = [];
  cargando: boolean = false;
  userId: string = '';

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
    }
  }

  onFechaSeleccionada(event: any) {
    // Obtener la fecha seleccionada del evento
    this.fechaSeleccionada = event.detail.value.split('T')[0];
    
    // Cargar los entrenamientos para la fecha seleccionada
    this.cargarEntrenamientosDelDia();
  }

  cargarEntrenamientosDelDia() {
    if (!this.fechaSeleccionada || !this.userId) {
      this.entrenamientosDelDia = [];
      return;
    }
  
    this.cargando = true;
    
    // Utilizamos el servicio para obtener los entrenamientos por fecha
    this.entrenamientosService.getEntrenamientosPorFecha(this.fechaSeleccionada)
      .subscribe({
        next: (data: any) => {
          console.log('Datos recibidos de la API:', data);
          
          // Check if data is an array before using filter
          if (Array.isArray(data)) {
            // Filtramos los entrenamientos para mostrar solo los del usuario actual
            this.entrenamientosDelDia = data.filter((entrenamiento: any) => 
              entrenamiento.idAtleta === this.userId
            );
          } else if (data && data.data && Array.isArray(data.data)) {
            // If data is wrapped in a data property (common API pattern)
            this.entrenamientosDelDia = data.data.filter((entrenamiento: any) => 
              entrenamiento.idAtleta === this.userId
            );
          } else {
            // If data is not in expected format, set empty array
            console.warn('Datos recibidos no tienen el formato esperado:', data);
            this.entrenamientosDelDia = [];
          }
          
          console.log('Entrenamientos filtrados:', this.entrenamientosDelDia);
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