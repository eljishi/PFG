import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonItem, IonInput,
  IonTextarea, IonFooter, IonGrid, IonRow, IonCol,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonFab, IonFabButton, ToastController
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

import { addIcons } from 'ionicons';
import { addCircleOutline, closeCircleOutline, closeOutline, saveOutline } from 'ionicons/icons';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';
import { Entrenamiento, Ejercicio as EjercicioBackend, Serie as SerieBackend } from 'src/app/common/entrenamientos';
import { UsuariosService } from 'src/app/services/usuarios.service'; 

interface Ejercicio {
  nombre: string;
  descripcion: string;
  series: Serie[];
}

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
  idAtleta: string = '';
  entrenamientoId: string = '';
  esAtleta: boolean = false;
  
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
        this.esAtleta = false;
      } else if (params['entrenamientoId']) {
        this.entrenamientoId = params['entrenamientoId'];
        this.cargarEntrenamiento(params['entrenamientoId']);
        if (this.usuariosService.usuario && !this.usuariosService.usuario.esEntrenador) {
          this.esAtleta = true;
        }
      } else {
        if (this.usuariosService.usuario && this.usuariosService.usuario._id) {
          this.idAtleta = this.usuariosService.usuario._id;
          this.esAtleta = !this.usuariosService.usuario.esEntrenador;
        } else {
          console.log('No se puede obtener Id atleta');
        }
      }
    });
  }

  cargarEntrenamiento(entrenamientoId: string) {
    this.entrenamientoId = entrenamientoId;
    this.entrenamientosService.getEntrenamiento(entrenamientoId).subscribe({
      next: (response) => {
        if (response && response.data) {
          const entrenamiento = response.data;
          this.tituloEntrenamiento = entrenamiento.nombre;
          this.fechaEntrenamiento = new Date(entrenamiento.fecha).toISOString().split('T')[0];
          this.idAtleta = entrenamiento.idAtleta || '';
          this.ejerciciosAgregados = entrenamiento.ejercicios.map(ejercicio => {
            return {
              nombre: ejercicio.nombre,
              descripcion: ejercicio.descripcion,
              series: ejercicio.series.map((serie: SerieBackend) => {
                return {
                  kg: serie.kg.toString(),
                  rpe: serie.rpe.toString(),
                  repeticiones: serie.repeticiones.toString()
                };
              })
            };
          });

          this.mostrarToast('Entrenamiento cargado correctamente');
        } else {
          this.mostrarToast('No se pudo cargar el entrenamiento');
        }
      },
      error: (error) => {
        this.mostrarToast('Error al cargar el entrenamiento');
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
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }


  async guardarEntrenamiento() {
    if (!this.tituloEntrenamiento || !this.fechaEntrenamiento || this.ejerciciosAgregados.length === 0) {
      this.mostrarToast('El entrenamiento debe tener título, fecha y al menos un ejercicio');
      return;
    }


    let valoresInvalidos = false;

    for (let i = 0; i < this.ejerciciosAgregados.length; i++) {
      for (let j = 0; j < this.ejerciciosAgregados[i].series.length; j++) {
        const serie = this.ejerciciosAgregados[i].series[j];

        if (Number(serie.kg) < 0) {
          valoresInvalidos = true;
          this.mostrarToast('KG negativos no guardando');
        }

        if (Number(serie.rpe) < 0) {
          valoresInvalidos = true;
          this.mostrarToast('RPE negativos no guardando');
        } else if (Number(serie.rpe) > 10) {
          valoresInvalidos = true;
          this.mostrarToast('El maximo de RPE es 10');
        }

        if (Number(serie.repeticiones) < 0) {
          valoresInvalidos = true;
          this.mostrarToast('Repeticiones negativas no guardando');
        }
      }
    }

    if (valoresInvalidos) {
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
      let respuesta;
      
      if (this.entrenamientoId) {
        respuesta = await this.entrenamientosService.actualizarEntrenamiento(this.entrenamientoId, entrenamiento).toPromise();
        this.mostrarToast('Entrenamiento actualizado');
      } else {
        respuesta = await this.entrenamientosService.guardarEntrenamiento(entrenamiento).toPromise();
        if (respuesta && respuesta.data && respuesta.data._id) {
          this.entrenamientoId = respuesta.data._id;
        }
        this.mostrarToast('Entrenamiento guardado');
      }

    } catch (error) {
      this.mostrarToast('Error al guardar el entrenamiento');
    }
  }

  
  eliminarEjercicio(index: number) {
    if (this.esAtleta) {
      this.mostrarToast('Solo los entrenadores pueden eliminar ejercicios');
      return;
    }
    
    if (this.ejerciciosAgregados.length <= 1) {
      this.mostrarToast('Debe haber como mínimo 1 ejercicio');
      return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
      this.ejerciciosAgregados.splice(index, 1);
      this.mostrarToast('Ejercicio eliminado correctamente');
    }
  }
}
