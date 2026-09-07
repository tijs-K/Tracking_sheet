
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
      import('./pages/dashboard/dashboard').then(
        (component) => component.Dashboard
      ),
  },
  {
    path: 'applications',
    loadComponent: () =>
        import('./pages/applications/applications').then(
            (component) => component.Applications
        ) ,
  },
  {
    path: 'settings',
    loadComponent: () =>
        import('./pages/settings/settings').then(
            (component) => component.Settings
        ),
  }
];