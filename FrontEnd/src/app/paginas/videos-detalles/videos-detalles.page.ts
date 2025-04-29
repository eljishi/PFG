import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonSpinner,
  IonIcon  // Add this import
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { Ejercicios } from 'src/app/common/ejercicios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos-detalles',
  templateUrl: './videos-detalles.page.html',
  styleUrls: ['./videos-detalles.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,
    HeaderComponent,
    IonIcon  
  ]
})
export class VideosDetallesPage implements OnInit {
  videoId: string = ''; 
  videoDetails: Ejercicios | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private ejerciciosService: EjerciciosService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.videoId = idParam;
      this.cargarDetallesVideo();
    } else {
      this.error = 'No se ha proporcionado un ID válido';
      this.isLoading = false;
    }
  }

  cargarDetallesVideo() {
    this.isLoading = true;
    this.error = null;
    
    this.ejerciciosService.getEjercicio(this.videoId).subscribe({
      next: (data) => {
        this.videoDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los detalles del ejercicio:', err);
        this.error = 'No se pudo cargar la información del ejercicio';
        this.isLoading = false;
      },
      complete: () => {
        console.log('Carga de detalles completada');
        this.isLoading = false;
      }
    });
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
