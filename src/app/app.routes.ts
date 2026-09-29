import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((component) => component.Dashboard),
  },
  {
    path: 'applications',
    loadComponent: () =>
      import('./pages/applications/applications').then((component) => component.Applications),
  },
  {
    path: 'applications/:id',
    loadComponent: () =>
        import('./pages/specific-application/specific-application').then(
            (component) => component.SpecificApplication
        ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings').then((component) => component.Settings),
  },
  {
    path: 'add-application',
    loadComponent: () =>
      import('./pages/add-application/add-application').then((component) => component.AddApplication),
  }
];
