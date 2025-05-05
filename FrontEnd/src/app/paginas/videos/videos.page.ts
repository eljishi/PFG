import { Component, inject, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { Ejercicios } from 'src/app/common/ejercicios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private injector: Injector, 
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
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
        this.error = 'No se pueden cargar los ejercicios.';
        this.isLoading = false;
      },
      complete: () => {
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

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
