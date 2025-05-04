import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';

@Component({
  selector: 'app-detalle-entrenamiento',
  templateUrl: './detalle-entrenamiento.page.html',
  styleUrls: ['./detalle-entrenamiento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonBackButton, 
    IonButtons, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonList, 
    IonItem, 
    IonLabel,
    IonSpinner
  ]
})
export class DetalleEntrenamientoPage implements OnInit {
  entrenamiento: any = null;
  cargando: boolean = false;
  entrenamientoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private entrenamientosService: EntrenamientosService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.entrenamientoId = id;
        this.cargarDetalleEntrenamiento();
      }
    });
  }

  cargarDetalleEntrenamiento() {
    this.cargando = true;
    
    this.entrenamientosService.getEntrenamiento(this.entrenamientoId).subscribe({
      next: (data) => {
        console.log('Datos del entrenamiento recibidos:', data);
        
        // Verificar si los datos vienen en una propiedad 'data'
        if (data && data.data) {
          this.entrenamiento = data.data;
        } else {
          this.entrenamiento = data;
        }
        
        // Asegurarse de que los ejercicios estén en el formato correcto
        if (this.entrenamiento && this.entrenamiento.ejercicios) {
          console.log('Ejercicios encontrados:', this.entrenamiento.ejercicios.length);
        } else {
          console.warn('No se encontraron ejercicios en el entrenamiento');
          if (this.entrenamiento) {
            this.entrenamiento.ejercicios = [];
          }
        }
        
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el detalle del entrenamiento:', error);
        this.entrenamiento = null;
        this.cargando = false;
      }
    });
  }
}
