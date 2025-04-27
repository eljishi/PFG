import { Component, inject, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { ApiResponseEjercicios, Ejercicios } from 'src/app/common/ejercicios';

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
    HeaderComponent
  ]
})
export class VideosPage implements OnInit { 

  private ejerciciosService: EjerciciosService;

  ejercicios: Ejercicios[] = [];

  constructor(private injector: Injector) {
    this.ejerciciosService = injector.get(EjerciciosService);
  }

  ngOnInit() {
    this.loadEjercicios();
  }

  private loadEjercicios() {
    this.ejerciciosService.getEjercicios().subscribe({
      next: data => {
        this.ejercicios = data;
      },
      error: err => console.log(err),
      complete: () => console.log("completado")
    });
  }


}
