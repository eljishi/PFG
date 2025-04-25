import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonItem, IonInput, IonTextarea, IonFooter, IonGrid, IonRow, IonCol, ModalController } from '@ionic/angular/standalone';

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
    HeaderComponent
  ]
})
export class EjerciciosPage implements OnInit {
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
    // Reiniciar el objeto de ejercicio
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

  guardarEjercicio() {
    // Aquí iría la lógica para guardar el ejercicio
    console.log('Ejercicio a guardar:', this.nuevoEjercicio);
    this.cerrarModal();
  }
}
