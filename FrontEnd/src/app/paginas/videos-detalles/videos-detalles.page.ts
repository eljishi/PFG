import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-videos-detalles',
  templateUrl: './videos-detalles.page.html',
  styleUrls: ['./videos-detalles.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class VideosDetallesPage implements OnInit {
  videoId: number = 0; 
  videoDetails: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    this.cargarDetallesVideo();
  }

  cargarDetallesVideo() {
 
    this.videoDetails = {
      id: this.videoId,
      name: 'Nombre del ejercicio ' + this.videoId,
      description: 'Descripción detallada del ejercicio en video',
      videoUrl: 'https://ejemplo.com/video' + this.videoId,

    };
  }
}
