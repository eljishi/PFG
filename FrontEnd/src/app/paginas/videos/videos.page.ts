import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EjerciciosService } from 'src/app/services/ejercicios.service';

// Define the Exercise interface
interface Exercise {
  id: number;
  name: string;
  video: string;
  description: string;
  nullCauses: {
    reason: string;
    image: string;
  }[];
}

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
    HeaderComponent,
    IonButton
  ]
})
export class VideosPage implements OnInit {
  exercises: Exercise[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private router: Router,
    private ejerciciosService: EjerciciosService
  ) { }

  ngOnInit() {
    this.cargarEjercicios();
  }
  
  cargarEjercicios() {
    this.loading = true;
    this.error = false;
    
    this.ejerciciosService.getEjercicios().subscribe({
      next: (data) => {
        console.log('Datos recibidos de la API:', data);
        this.exercises = data as unknown as Exercise[];
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar los ejercicios:", error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  verDetallesEjercicio(id: number) {
    this.router.navigate(['/videos-detalles', id]);
  }
  
  // Método para reintentar la carga en caso de error
  reintentarCarga() {
    this.cargarEjercicios();
  }
}
