import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  settingsOutline, 
  logOutOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    RouterLink
  ]
})
export class MenuLateralComponent implements OnInit {

  constructor() {
    // Register the icons we'll be using
    addIcons({
      'person-outline': personOutline,
      'settings-outline': settingsOutline,
      'log-out-outline': logOutOutline
    });
  }

  ngOnInit() {}

}
