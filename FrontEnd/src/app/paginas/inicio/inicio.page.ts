import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { EntrenamientosService } from 'src/app/services/entrenamientos.service';
import { Entrenamiento } from 'src/app/common/entrenamientos';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton]
})
export class InicioPage implements OnInit {
  atletas: Array<{ id: string, nombre: string }> = [];
  esEntrenador: boolean = false;
  entrenamientos: Entrenamiento[] = [];
  cargandoEntrenamientos: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private entrenamientosService: EntrenamientosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    await this.usuariosService.validaToken();

    if (this.usuariosService.usuario) {
      this.esEntrenador = this.usuariosService.usuario.esEntrenador;
      if (this.esEntrenador && this.usuariosService.usuario._id) {
        try {
          this.atletas = await this.usuariosService.getAtletasByEntrenador(this.usuariosService.usuario._id);
        } catch (error) {
          console.error('Error al cargar atletas:', error);
        }
      } else if (!this.esEntrenador && this.usuariosService.usuario._id) {
        this.cargarEntrenamientosAtleta(this.usuariosService.usuario._id);
      }
    }
  }

  cargarEntrenamientosAtleta(idAtleta: string) {
    this.cargandoEntrenamientos = true;
    
    this.entrenamientosService.getEntrenamientosPorAtleta(idAtleta).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.entrenamientos = response.data;
        } else {
          this.entrenamientos = [];
        }
        this.cargandoEntrenamientos = false;
      },
      error: (error) => {
        this.cargandoEntrenamientos = false;
      }
    });
  }

  agregarRutina(atleta: { id: string, nombre: string }) {
    this.router.navigate(['/ejercicios'], {
      queryParams: {
        atletaId: atleta.id,
      }
    });
  }

  verDetalleEntrenamiento(entrenamiento: Entrenamiento) {
    this.router.navigate(['/detalle-entrenamiento'], {
      queryParams: {
        entrenamientoId: entrenamiento._id || entrenamiento.id
      }
    });
  }
}
