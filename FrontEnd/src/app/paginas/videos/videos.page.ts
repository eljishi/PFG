import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonGrid, 
  IonRow, 
  IonCol,
  IonIcon 
} from '@ionic/angular/standalone';

interface NullCause {
  reason: string;
  image: string;
}

interface Exercise {
  id: number;
  name: string;
  video: string;
  description: string;
  nullCauses: NullCause[];
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton, 
    CommonModule, 
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon 
  ]
})
export class VideosPage implements OnInit {
  exercises: Exercise[] = [
    {
      id: 1,
      name: "Sentadilla",
      video: "Url",
      description: "La sentadilla es un ejercicio donde cargas el peso de la barra sobre tu espalda o hombros y bajas hasta que las rodillas hagan o pasen el ángulo de 90º",
      nullCauses: [
        {
          reason: "No llegar a romper el ángulo de 90º",
          image: "URL"
        }
      ]
    },
    {
      id: 2,
      name: "Press Banca",
      video: "Url",
      description: "Es un ejercicio donde tienes que tumbarte en un banco plano, sacar la barra del rack y ser capaz de llevarla desde el rack a tu pecho y volver a subirla de forma controlada",
      nullCauses: [
        {
          reason: "Levantar alguno de los 5 puntos de apoyo del banco",
          image: "URL"
        }
      ]
    },
    {
      id: 3,
      name: "Peso Muerto",
      video: "Url",
      description: "El peso muerto es un ejercicio en el que la barra estara en el suelo y deberas cogerla con tus manos, una vez preparado tienes que subir hasta la altura de la cadera la barra",
      nullCauses: [
        {
          reason: "Arrastrar la barra por la pierna de forma notoria",
          image: "URL"
        }
      ]
    },
    {
      id: 4,
      name: "Extension de cuádriceps",
      video: "Url",
      description: "En una maquina, sentado tendrás que levantar el peso haciendo uso solo de tus piernas",
      nullCauses: [
        {
          reason: "Este ejercicio no tiene motivo de nulo",
          image: "URL"
        }
      ]
    },
    {
      id: 5,
      name: "Press Inclinado",
      video: "Url",
      description: "En este ejercicio tendrás que tener un banco con una inclinación de unos 45º, y en una maquina guiada bajaras de forma controlada la barra hasta la mitad del pecho y volverás a subirla de forma controlada",
      nullCauses: [
        {
          reason: "Este ejercicio no tiene motivos de nulo",
          image: "URL"
        }
      ]
    },
    {
      id: 6,
      name: "Press militar de pie",
      video: "Url",
      description: "Tendras que tener una barra a la altura del pecho y has de subirla por encima de tu cabeza, hasta donde seas capaz, y luego bajarla de forma controlada otra vez a tu pecho",
      nullCauses: [
        {
          reason: "Este ejercicio no tiene motivos de nulo",
          image: "URL"
        }
      ]
    },
    {
      id: 7,
      name: "Remo en Barra",
      video: "Url",
      description: "El remo en barra es un ejercicio en el que, con las piernas ligeramente flexionadas y la espalda recta, debes tirar de la barra hacia tu abdomen, manteniendo los codos pegados al cuerpo.",
      nullCauses: [
        {
          reason: "Curvar excesivamente la espalda",
          image: "URL"
        }
      ]
    },
    {
      id: 8,
      name: "Peso Muerto Rumano",
      video: "Url",
      description: "El peso muerto rumano es similar al peso muerto tradicional, pero en este caso debes mantener las piernas más rectas mientras bajas la barra, centrándote en activar los isquiotibiales y glúteos.",
      nullCauses: [
        {
          reason: "Flexionar demasiado las rodillas",
          image: "URL"
        }
      ]
    },
    {
      id: 9,
      name: "Curl de Bíceps en Barra",
      video: "Url",
      description: "El curl de bíceps en barra es un ejercicio clásico para trabajar los bíceps. Se realiza sosteniendo una barra con las manos en supinación y realizando un movimiento de flexión del codo para elevar la barra.",
      nullCauses: [
        {
          reason: "Balancear el cuerpo para levantar más peso",
          image: "URL"
        }
      ]
    },
    {
      id: 10,
      name: "Elevaciones Laterales con Mancuerna",
      video: "Url",
      description: "Este ejercicio consiste en levantar una mancuerna con cada mano hacia los lados, manteniendo los codos ligeramente flexionados para trabajar los deltoides laterales.",
      nullCauses: [
        {
          reason: "Levantar demasiado peso y comprometer la forma",
          image: "URL"
        }
      ]
    },
    {
      id: 11,
      name: "Extensión de Tríceps en Polea",
      video: "Url",
      description: "En este ejercicio, debes usar una polea alta con una cuerda o barra para extender los brazos hacia abajo, trabajando los tríceps.",
      nullCauses: [
        {
          reason: "No mantener los codos fijos al costado del cuerpo",
          image: "URL"
        }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  verDetallesEjercicio(id: number) {
    this.router.navigate(['/videos-detalles', id]);
  }
}
