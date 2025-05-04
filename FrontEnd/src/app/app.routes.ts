import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'videos',
    loadComponent: () => import('./paginas/videos/videos.page').then(m => m.VideosPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./paginas/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./paginas/inicio/inicio.page').then(m => m.InicioPage)
      },
      {
        path: 'videos',
        loadComponent: () => import('./paginas/videos/videos.page').then(m => m.VideosPage)
      },{
        path: 'calendario',
        loadComponent: () => import('./paginas/calendario/calendario.page').then( m => m.CalendarioPage)
      },
      {
        path: 'detalle-entrenamiento/:id',
        loadComponent: () => import('./paginas/detalle-entrenamiento/detalle-entrenamiento.page').then( m => m.DetalleEntrenamientoPage)
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'ejercicios',
    loadComponent: () => import('./paginas/ejercicios/ejercicios.page').then(m => m.EjerciciosPage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./paginas/auth/auth.page').then(m => m.AuthPage)
  },
  {
    path: 'perfil-usuario',
    loadComponent: () => import('./paginas/perfil-usuario/perfil-usuario.page').then(m => m.PerfilUsuarioPage)
  },
  {
    path: 'videos-detalles/:id',
    loadComponent: () => import('./paginas/videos-detalles/videos-detalles.page').then( m => m.VideosDetallesPage)
  },
  {
    path: 'detalle-entrenamiento',
    loadComponent: () => import('./paginas/detalle-entrenamiento/detalle-entrenamiento.page').then( m => m.DetalleEntrenamientoPage)
  },
  // Add this new route to handle the ID parameter at the root level
  {
    path: 'detalle-entrenamiento/:id',
    loadComponent: () => import('./paginas/detalle-entrenamiento/detalle-entrenamiento.page').then( m => m.DetalleEntrenamientoPage)
  },
];