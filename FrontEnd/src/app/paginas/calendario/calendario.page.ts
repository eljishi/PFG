import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonDatetime } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    IonDatetime
  ]
})
export class CalendarioPage implements OnInit {
  fechaSeleccionada: string = '';
  entrenamientosDelDia: any[] = [];
  cargando: boolean = false;
  userId: string = '';

  constructor(
    private entrenamientosService: EntrenamientosService,
    private usuariosService: UsuariosService
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
        next: (data) => {
          // Filtramos los entrenamientos para mostrar solo los del usuario actual
          this.entrenamientosDelDia = data.filter(entrenamiento => 
            entrenamiento.usuarioId === this.userId || 
            entrenamiento.atletaId === this.userId
          );
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar entrenamientos:', error);
          this.entrenamientosDelDia = [];
          this.cargando = false;
        }
      });
  }
}