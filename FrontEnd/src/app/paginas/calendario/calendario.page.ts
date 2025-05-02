import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonDatetime } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';

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

  constructor(private entrenamientosService: EntrenamientosService) { }

  ngOnInit() {
  }

  onFechaSeleccionada(event: any) {
    // Obtener la fecha seleccionada del evento
    this.fechaSeleccionada = event.detail.value.split('T')[0];
    
    // Cargar los entrenamientos para la fecha seleccionada
    this.cargarEntrenamientosDelDia();
  }

  cargarEntrenamientosDelDia() {
    this.cargando = true;
    
    // Simulamos la carga de entrenamientos
    // En un caso real, deberías usar tu servicio para obtener los datos del backend
    setTimeout(() => {
      // Ejemplo de datos de entrenamiento (reemplazar con datos reales)
      this.entrenamientosDelDia = [
        {
          titulo: 'Entrenamiento de fuerza',
          descripcion: 'Ejercicios para fortalecer el tren superior',
          duracion: 60
        },
        {
          titulo: 'Cardio',
          descripcion: 'Entrenamiento cardiovascular de intensidad media',
          duracion: 45
        }
      ];
      this.cargando = false;
    }, 1000);
    
    // Cuando tengas el endpoint en el backend, usa esto:
    /*
    this.entrenamientosService.getEntrenamientosPorFecha(this.fechaSeleccionada)
      .subscribe({
        next: (data) => {
          this.entrenamientosDelDia = data;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar entrenamientos:', error);
          this.entrenamientosDelDia = [];
          this.cargando = false;
        }
      });
    */
  }
}