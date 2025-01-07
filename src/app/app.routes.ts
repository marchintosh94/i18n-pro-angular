import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'example',
    children: [
      {
        path: 'basic',
        loadComponent: () => import('./features/basic/basic.component').then(m => m.BasicComponent),
      },
      {
        path: 'directive',
        loadComponent: () => import('./features/basic/basic.component').then(m => m.BasicComponent),
      },
      {
        path: 'pipe',
        loadComponent: () => import('./features/basic/basic.component').then(m => m.BasicComponent),
      },
    ]
  },
  {
    path: 'docs',
    loadComponent: () => import('./features/docs/docs.component').then(m => m.DocsComponent)
  }
];
