import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar]
})
export class CalendarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
