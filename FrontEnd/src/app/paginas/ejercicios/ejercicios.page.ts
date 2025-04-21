import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, CommonModule, FormsModule]
})
export class EjerciciosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
