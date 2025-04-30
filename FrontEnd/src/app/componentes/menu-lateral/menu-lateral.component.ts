import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  settingsOutline, 
  logOutOutline 
} from 'ionicons/icons';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs';

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
export class MenuLateralComponent implements OnInit, OnDestroy {
  nombreUsuario: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    addIcons({
      'person-outline': personOutline,
      'settings-outline': settingsOutline,
      'log-out-outline': logOutOutline
    });
  }

  ngOnInit() {
    this.cargarDatosUsuario();
    this.usuariosService.validaToken().then(() => {
      this.cargarDatosUsuario();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cargarDatosUsuario() {
    if (this.usuariosService.usuario) {
      this.nombreUsuario = this.usuariosService.usuario.user || '';
    } else {
      this.nombreUsuario = '';
    }
  }

  cerrarSesion() {
    this.usuariosService.logout();
    this.router.navigateByUrl('/auth');
  }
}
