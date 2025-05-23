import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonBackButton]
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string = '';

  constructor() { }

  ngOnInit() {}
}
