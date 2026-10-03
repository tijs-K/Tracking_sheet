import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ThemeService } from './services/themeService';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly themeService = inject(ThemeService);
  protected readonly title = signal('Tracking_sheet');
}
