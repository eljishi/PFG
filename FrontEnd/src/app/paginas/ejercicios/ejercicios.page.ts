import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonItem, IonInput,
  IonTextarea, IonFooter, IonGrid, IonRow, IonCol, ModalController, IonLabel, IonList,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonFab, IonFabButton, ToastController
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

import { addIcons } from 'ionicons';
import { addCircleOutline, closeCircleOutline, closeOutline, saveOutline } from 'ionicons/icons';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';
import { Entrenamiento, Ejercicio as EjercicioBackend, Serie as SerieBackend } from 'src/app/common/entrenamientos';
import { UsuariosService } from 'src/app/services/usuarios.service'; // Replace AuthService import

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
    // Remove ToastController from here
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
  idAtleta: string = ''; 

  constructor(
    private entrenamientosService: EntrenamientosService,
    private toastController: ToastController,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute 
  ) {
    addIcons({ addCircleOutline, closeCircleOutline, closeOutline, saveOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['atletaId']) {
        this.idAtleta = params['atletaId'];
      } else {
        if (this.usuariosService.usuario && this.usuariosService.usuario._id) {
          this.idAtleta = this.usuariosService.usuario._id;
        } else {
          console.log('No se pudo obtener el ID del atleta');
        }
      }
    });
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

  async guardarEntrenamiento() {
    if (!this.tituloEntrenamiento || !this.fechaEntrenamiento || this.ejerciciosAgregados.length === 0) {
      this.mostrarToast('El entrenamiento debe tener título, fecha y al menos un ejercicio');
      return;
    }

    const ejerciciosFormateados: EjercicioBackend[] = this.ejerciciosAgregados.map(ejercicio => {
      const seriesFormateadas: SerieBackend[] = ejercicio.series.map(serie => {
        return {
          kg: Number(serie.kg),
          rpe: Number(serie.rpe),
          repeticiones: Number(serie.repeticiones)
        };
      });

      return {
        nombre: ejercicio.nombre,
        descripcion: ejercicio.descripcion,
        series: seriesFormateadas
      };
    });

    const entrenamiento: Entrenamiento = {
      idAtleta: this.idAtleta,
      fecha: new Date(this.fechaEntrenamiento),
      nombre: this.tituloEntrenamiento,
      ejercicios: ejerciciosFormateados
    };

    try {
      const respuesta = await this.entrenamientosService.guardarEntrenamiento(entrenamiento).toPromise();
      console.log('Entrenamiento guardado:', respuesta);
      this.mostrarToast('Entrenamiento guardado con éxito');
      
      // Limpiar el formulario después de guardar
      this.tituloEntrenamiento = '';
      this.fechaEntrenamiento = '';
      this.ejerciciosAgregados = [];
    } catch (error) {
      console.error('Error al guardar el entrenamiento:', error);
      this.mostrarToast('Error al guardar el entrenamiento');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
