import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonItem, IonInput,
  IonTextarea, IonFooter, IonGrid, IonRow, IonCol, ModalController, IonLabel, IonList,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonFab, IonFabButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { addCircleOutline, closeCircleOutline, closeOutline, saveOutline } from 'ionicons/icons';
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
    IonCardTitle,
    IonFab,
    IonFabButton
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
    addIcons({ addCircleOutline, closeCircleOutline, closeOutline, saveOutline });
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

    console.log('Ejercicio guardado:', ejercicioCompleto);
    this.isModalOpen = false;
    this.nuevoEjercicio = {
      nombre: '',
      descripcion: '',
      series: []
    };
  }

  guardarEntrenamiento() {
    if (!this.tituloEntrenamiento || !this.fechaEntrenamiento || this.ejerciciosAgregados.length === 0) {
      console.log('El entrenamiento debe tener título, fecha y al menos un ejercicio');
      return;
    }

    const entrenamiento = {
      titulo: this.tituloEntrenamiento,
      fecha: this.fechaEntrenamiento,
      ejercicios: [...this.ejerciciosAgregados]
    };

    console.log('Entrenamiento guardado:', entrenamiento);
    // Aquí puedes añadir la lógica para guardar el entrenamiento en tu backend
    
    // Opcional: Limpiar el formulario después de guardar
    this.tituloEntrenamiento = '';
    this.fechaEntrenamiento = '';
    this.ejerciciosAgregados = [];
  }
}
