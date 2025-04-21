import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-videos-detalles',
  templateUrl: './videos-detalles.page.html',
  styleUrls: ['./videos-detalles.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VideosDetallesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
