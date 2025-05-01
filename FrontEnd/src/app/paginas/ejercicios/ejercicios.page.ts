import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonItem, IonInput, 
         IonTextarea, IonFooter, IonGrid, IonRow, IonCol, ModalController, IonLabel, IonList,
         IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { addCircleOutline, closeCircleOutline, closeOutline } from 'ionicons/icons';
import { HeaderComponent } from 'src/app/componentes/header/header.component';

// Definición de la interfaz Ejercicio
interface Ejercicio {
  nombre: string;
  descripcion: string;
  series: Serie[];
}

// Definición de la interfaz Serie
interface Serie {
  kg: string;
  rpe: string;
  repeticiones: string;
}

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonIcon, 
    IonModal, 
    IonItem, 
    IonInput, 
    IonTextarea, 
    IonFooter, 
    IonGrid, 
    IonRow, 
    IonCol,
    HeaderComponent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ]
})
export class EjerciciosPage implements OnInit {

  tituloEntrenamiento: string = '';
  fechaEntrenamiento: string = '';
  seriesAgregadas: Serie[] = [];
  ejerciciosAgregados: Ejercicio[] = [];
  

  isModalOpen = false;
  nuevoEjercicio: Ejercicio = {
    nombre: '',
    descripcion: '',
    series: []
  };

  constructor(private modalController: ModalController) {
    addIcons({ addCircleOutline, closeCircleOutline, closeOutline });
  }

  ngOnInit() {
  }

  abrirModalNuevoEjercicio() {
    this.isModalOpen = true;
    this.nuevoEjercicio = {
      nombre: '',
      descripcion: '',
      series: []
    };
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  agregarSerie() {
    this.nuevoEjercicio.series.push({
      kg: '',
      rpe: '',
      repeticiones: ''
    });
  }

  eliminarSerie(index: number) {
    this.nuevoEjercicio.series.splice(index, 1);
  }

  agregarSerieAEjercicio(ejercicioIndex: number) {
    this.ejerciciosAgregados[ejercicioIndex].series.push({
      kg: '',
      rpe: '',
      repeticiones: ''
    });
  }

  eliminarSerieDeEjercicio(ejercicioIndex: number, serieIndex: number) {
    this.ejerciciosAgregados[ejercicioIndex].series.splice(serieIndex, 1);
  }

  guardarEjercicio() {
    if (!this.nuevoEjercicio.nombre || this.nuevoEjercicio.series.length === 0) {
      console.log('El ejercicio debe tener nombre y al menos una serie');
      return;
    }
    
    const ejercicioCopia: Ejercicio = {
      nombre: this.nuevoEjercicio.nombre,
      descripcion: this.nuevoEjercicio.descripcion,
      series: [...this.nuevoEjercicio.series]
    };
    
    this.ejerciciosAgregados.push(ejercicioCopia);
    
    const ejercicioCompleto = {
      titulo: this.tituloEntrenamiento,
      fecha: this.fechaEntrenamiento,
      ejercicio: ejercicioCopia
    };
    
    this.isModalOpen = false;
    this.nuevoEjercicio = {
      nombre: '',
      descripcion: '',
      series: []
    };
  }
}
