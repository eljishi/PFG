import { Component, inject, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { Ejercicios } from 'src/app/common/ejercicios';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonIcon,
    IonSpinner,
    HeaderComponent
  ]
})
export class VideosPage implements OnInit { 

  private ejerciciosService: EjerciciosService;
  ejercicios: Ejercicios[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private injector: Injector, private router: Router) {
    this.ejerciciosService = injector.get(EjerciciosService);
  }

  ngOnInit() {
    this.loadEjercicios();
  }

  private loadEjercicios() {
    this.isLoading = true;
    this.error = null;
    
    this.ejerciciosService.getEjercicios().subscribe({
      next: data => {
        this.ejercicios = data;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Error al cargar los ejercicios. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
      },
      complete: () => {
        console.log("Carga de ejercicios completada");
        this.isLoading = false;
      }
    });
  }

  openVideoDetail(ejercicio: Ejercicios) {
    if (ejercicio && ejercicio._id) {
      this.router.navigate(['/videos-detalles', ejercicio._id]);
    } else {
      console.error('El ejercicio no tiene un ID válido');
    }
  }
}
