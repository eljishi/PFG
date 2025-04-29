import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class RegistroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToRegister() {
    this.router.navigate(['/auth'], { queryParams: { type: 'register' } });
  }

  navigateToAthleteLogin() {
    this.router.navigate(['/auth'], { queryParams: { type: 'athlete-login' } });
  }

  navigateToCoachLogin() {
    this.router.navigate(['/auth'], { queryParams: { type: 'coach-login' } });
  }

  navigateToCoachRegister() {
    this.router.navigate(['/auth'], { queryParams: { type: 'coach-register' } });
  }
}